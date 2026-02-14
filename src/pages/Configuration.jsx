import { useState, useEffect } from "react";

export default function Configuration() {

    const [messName, setMessName] = useState("");
    const [institution, setInstitution] = useState("");
    const [messes, setMesses] = useState([]);
    const [selectedQR, setSelectedQR] = useState(null);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");

    const fetchMesses = async () => {
        const res = await fetch("http://localhost:8000/api/config/mess", {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        const data = await res.json();
        setMesses(data);
    };

    useEffect(() => {
        fetchMesses();
    }, []);

    const createMess = async () => {

        if (!messName || !institution) {
            setMessage("Please fill all fields");
            return;
        }

        const res = await fetch("http://localhost:8000/api/config/mess", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify({
                name: messName,
                institution: institution
            })
        });

        const data = await res.json();

        if (!res.ok) {
            setMessage(data.detail);
            return;
        }

        setMessage("Mess created successfully");
        setMessName("");
        setInstitution("");
        fetchMesses();
    };

    return (
        <div style={{ padding: "40px", color: "white" }}>
            <h2>Configuration - Manage Mess</h2>

            {message && (
                <p style={{ color: "#ff9800" }}>{message}</p>
            )}

            <div style={{ marginBottom: "30px" }}>
                <input
                    placeholder="Mess Name"
                    value={messName}
                    onChange={(e) => setMessName(e.target.value)}
                />
                <br /><br />

                <input
                    placeholder="Institution Name"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                />
                <br /><br />

                <button onClick={createMess}>
                    Create Mess
                </button>
            </div>

            <h3>Existing Messes</h3>

            {messes.length === 0 && <p>No mess configured yet.</p>}

            {messes.map((mess) => (
                <div
                    key={mess.id}
                    style={{
                        background: "#222",
                        padding: "15px",
                        marginBottom: "15px",
                        borderRadius: "8px"
                    }}
                >
                    <strong>{mess.name}</strong>
                    <p>{mess.institution}</p>

                    <button
                        onClick={() =>
                            setSelectedQR(`http://localhost:8000/api/qr/${mess.name}`)
                        }
                        style={{
                            background: "#ff9800",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            cursor: "pointer"
                        }}
                    >
                        Show QR
                    </button>
                </div>
            ))}

            {selectedQR && (
                <div style={{ marginTop: "30px" }}>
                    <h3>QR Code Preview</h3>
                    <img
                        src={selectedQR}
                        alt="QR Code"
                        style={{ width: "200px" }}
                    />
                </div>
            )}
        </div>
    );
}
5