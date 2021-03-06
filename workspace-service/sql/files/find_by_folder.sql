SELECT files.id,
    file_versions.file_title AS title,
    file_versions.file_description AS description,
    file_versions.folder,
    file_versions.file_name,
    file_versions.blob_storage_path,
    file_versions.file_type,
    files.created_at,
    file_versions.created_at AS modified_at,
    files.deleted_at,
    files.latest_version AS version,
    file_versions.version_number

FROM files JOIN file_versions ON files.latest_version = file_versions.id
WHERE file_versions.folder = $1
AND files.deleted_at IS NULL
ORDER BY file_versions.file_title
