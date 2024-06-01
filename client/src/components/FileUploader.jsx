import React, { useState } from "react";

const Result = ({ status }) => {
    if (status === "success") {
        return <p> File uploaded successfully!</p>;
    } else if (status === "fail") {
        return <p> File upload failed!</p>;
    } else if (status === "uploading") {
        return <p> Uploading selected file...</p>;
    } else {
        return null;
    }
};

const SingleFileUploader = () => {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState<
        "initial" | "uploading" | "success" | "fail"
    >("initial");

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (file) {
            setStatus("uploading");

            const formData = new FormData();
            formData.append("file", file);

            try {
                //TODO aggiungere endpoint
                const result = await fetch("", {
                    method: "POST",
                    body: formData,
                });

                const data = await result.json();

                console.log(data);
                setStatus("success");
            } catch (error) {
                console.error(error);
                setStatus("fail");
            }
        }
    };

    return (
        <>
            <div className="input-group">
                <label htmlFor="file" >
                    Choose a file
                </label>
                <input id="file" type="file" onChange={handleFileChange} />
            </div>
            {file && (
                <section>
                    File details:
                    <ul>
                        <li>Name: {file.name}</li>
                        <li>Type: {file.type}</li>
                        <li>Size: {file.size} bytes</li>
                    </ul>
                </section>
            )}

            {file && (
                <button onClick={handleUpload} className="submit">
                    Upload a file
                </button>
            )}

            <Result status={status} />
        </>
    );
};

export default SingleFileUploader;