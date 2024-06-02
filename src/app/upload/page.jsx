"use client"
import React, { useState, useEffect } from 'react';
import { S3 } from 'aws-sdk';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploadLink, setUploadLink] = useState(null);
  const [permanentLink, setPermanentLink] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [buckets, setBuckets] = useState([]);
  
  const ACCESSKEY = "97rvpukiu27v35u8"
  const SECRETKEY = "13594ba4-a563-4350-a953-2bce3fc8e64d"
  const ENDPOINT  = "https://storage.iran.liara.space"
  const BUCKET    = "producttests"


  
  const fetchBuckets = async () => {
    const s3 = new S3({
      accessKeyId: ACCESSKEY,
      secretAccessKey: SECRETKEY,
      endpoint: ENDPOINT,
    });
    try {
      const response = await s3.listBuckets().promise();
      setBuckets(response.Buckets);
    } catch (error) {
      console.error('Error fetching buckets: ', error);
    }
  };

  const fetchAllFiles = async () => {
    const s3 = new S3({
      accessKeyId: ACCESSKEY,
      secretAccessKey: SECRETKEY,
      endpoint: ENDPOINT,
    });

    try {
      const response = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
      setAllFiles(response.Contents);
    } catch (error) {
      console.error('Error fetching files: ', error);
    }
  };

  useEffect(() => {
    fetchBuckets();
    fetchAllFiles();
  }, [uploadLink]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(null);
    setUploadLink(null);
    setPermanentLink(null);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        setError('Please select a file');
        return;
      }

      const s3 = new S3({
        accessKeyId: ACCESSKEY,
        secretAccessKey: SECRETKEY,
        endpoint: ENDPOINT,
      });

      const params = {
        Bucket: BUCKET,
        Key: file.name,
        Body: file,
      };

      const response = await s3.upload(params).promise();
      const signedUrl = s3.getSignedUrl('getObject', {
        Bucket: BUCKET,
        Key: file.name,
        Expires: 3600,
      });

      setUploadLink(signedUrl);

      // Get permanent link
      const permanentSignedUrl = s3.getSignedUrl('getObject', {
        Bucket: BUCKET,
        Key: file.name,
        Expires: 31536000, // 1 year
      });
      setPermanentLink(permanentSignedUrl);

      // Update list of uploaded files
      setUploadedFiles((prevFiles) => [...prevFiles, response]);

      // Update list of all files
      fetchAllFiles();

      console.log('File uploaded successfully');
    } catch (error) {
      setError('Error uploading file: ' + error.message);
    }
  };

  const handleShowFiles = () => {
    console.log('List of uploaded files:', uploadedFiles);
  };

  const handleDeleteFile = async (file) => {
    try {
      const s3 = new S3({
        accessKeyId: ACCESSKEY,
        secretAccessKey: SECRETKEY,
        endpoint: ENDPOINT,
      });

      await s3.deleteObject({ Bucket: BUCKET, Key: file.Key }).promise();

      // Update the list of uploaded files
      setUploadedFiles((prevFiles) =>
        prevFiles.filter((uploadedFile) => uploadedFile.Key !== file.Key)
      );

      // Update list of all files
      fetchAllFiles();

      console.log('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file: ', error);
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload File to S3</h1>
      <input type="file" onChange={handleFileChange} />
      <button className="upload-button" onClick={handleUpload} disabled={!file}>
        Upload
      </button>
      {uploadLink && (
        <h3 className="success-message">
          File uploaded successfully. Temporary Link:{' '}
          <a href={uploadLink} target="_blank" rel="noopener noreferrer">
            Temporary Link
          </a>
        </h3>
      )}
      {permanentLink && (
        <h3 className="success-message">
          Permanent Link:{' '}
          <a href={permanentLink} target="_blank" rel="noopener noreferrer">
            Permanent Link
          </a>
        </h3>
      )}
      <button className="show-files-button" onClick={handleShowFiles}>
        Show Uploaded Files
      </button>
      {uploadedFiles.length > 0 && (
        <div>
          <h2>Uploaded Files:</h2>
          <ul>
            {uploadedFiles.map((uploadedFile) => {
              const s3 = new S3({
                accessKeyId: ACCESSKEY,
                secretAccessKey: SECRETKEY,
                endpoint: ENDPOINT,
              });

              return (
                <li key={uploadedFile.Key}>
                  {uploadedFile.Key}{' '}
                  <a
                    href={s3.getSignedUrl('getObject', {
                      Bucket: BUCKET,
                      Key: uploadedFile.Key,
                      Expires: 3600,
                    })}
                    download
                  >
                    Download
                  </a>{' '}
                  <button onClick={() => handleDeleteFile(uploadedFile)}>
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {allFiles.length > 0 && (
        <div>
          <h2>All Files:</h2>
          <ul>
            {allFiles.map((file) => {
              const s3 = new S3({
                accessKeyId: ACCESSKEY,
                secretAccessKey: SECRETKEY,
                endpoint: ENDPOINT,
              });

              return (
                <li key={file.Key}>
                  {file.Key}{' '}
                  <a
                    href={s3.getSignedUrl('getObject', {
                      Bucket: BUCKET,
                      Key: file.Key,
                      Expires: 3600,
                    })}
                    download
                  >
                    Download
                  </a>{' '}
                  <button onClick={() => handleDeleteFile(file)}>
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      <div>
        <h2>Buckets:</h2>
        <ul>
          {buckets.map((bucket) => (
            <li key={bucket.Name}>{bucket.Name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default Upload;