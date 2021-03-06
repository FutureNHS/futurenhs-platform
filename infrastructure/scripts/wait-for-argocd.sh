#!/bin/bash
set -euo pipefail

# https://stackoverflow.com/a/1482133
cd $(dirname "$0")
REPO_ROOT="$(git rev-parse --show-toplevel)"
cd $REPO_ROOT

ENVIRONMENT="${1:?"Please specify your environment name as the first parameter, e.g. dev-jane"}"
APPNAME="${2:?"Please specify app name as the second parameter, e.g. frontend"}"

CURRENT_CONTEXT=$(kubectl config current-context)

if [ "$ENVIRONMENT" != "$CURRENT_CONTEXT" ]; then
	echo "You want to deploy to:   $ENVIRONMENT"
	echo "Your current content is: $CURRENT_CONTEXT"
	echo "Please change your current context (e.g. using 'kubectl config use-context' or a combination or 'az account set' and 'az aks get-credentials') and try again"
	exit 1
fi

if ! git diff; then
	echo "ERROR: you haven't committed yet."
	exit 1
fi

if ! git ls-files --others --exclude-standard --error-unmatch; then
	echo "ERROR: you have unstaged files."
	exit 1
fi

if ! git branch -r --contains HEAD | grep origin; then
	echo "ERROR: You haven't pushed your branch yet."
	exit 1
fi

./infrastructure/scripts/create-dev-overlays.py

# FIXME: we should really rename all of these folders for a bit of consistency.
if [ -d $APPNAME ]; then
	LOCALDIR="$APPNAME/manifests/$ENVIRONMENT"
else
	LOCALDIR="infrastructure/kubernetes/$APPNAME/$ENVIRONMENT"
fi

# grep returns true if it spits out any lines of output.
# grep -v image because we customize our image tags as part of the CI build.
while (
	argocd app diff $APPNAME --local $LOCALDIR || true
) | grep '^[<>]' | grep -v 'image: fnhsproduction.azurecr.io/[a-z]*'; do
	# Prod argocd to sync. Otherwise it will only check every 3 minutes.
	argocd app sync $APPNAME --prune
done

echo "Looks like you're up to date."
