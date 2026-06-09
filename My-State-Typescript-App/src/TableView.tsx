import { useEffect, useState } from "react";

export default function TableView() {
    const [allAdmin, setAllAdmin] = useState<any[]>([]);

    useEffect(() => {
        const data = [
            { name: "Pragna", email: "pragna@gmail.com", phone: "9087654321", isActive: true },
            { name: "Mayur", email: "mayur@gmail.com", phone: "9087654321", isActive: false },
            { name: "Ridham", email: "ridh@gmail.com", phone: "9087654321", isActive: true },
        ];
        setAllAdmin(data);
    }, []);

    // Shared Styles
    const cardStyle: React.CSSProperties = {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f9fafb",
        padding: "40px",
        minHeight: "100vh",
    };

    const tableWrapperStyle: React.CSSProperties = {
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        overflow: "hidden",
        borderCollapse: "collapse",
        width: "100%",
    };

    const thStyle: React.CSSProperties = {
        backgroundColor: "#f3f4f6",
        color: "#374151",
        textAlign: "left",
        padding: "12px 16px",
        fontSize: "14px",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        borderBottom: "1px solid #e5e7eb",
    };

    const tdStyle: React.CSSProperties = {
        padding: "16px",
        fontSize: "14px",
        color: "#4b5563",
        borderBottom: "1px solid #f3f4f6",
    };

    const badgeStyle = (isActive: boolean): React.CSSProperties => ({
        padding: "4px 12px",
        borderRadius: "9999px",
        fontSize: "12px",
        fontWeight: "500",
        backgroundColor: isActive ? "#dcfce7" : "#fee2e2",
        color: isActive ? "#166534" : "#991b1b",
    });

    const btnStyle = (type: "edit" | "delete"): React.CSSProperties => ({
        padding: "6px 12px",
        marginRight: "8px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: "bold",
        backgroundColor: type === "edit" ? "#eff6ff" : "#fff1f2",
        color: type === "edit" ? "#1d4ed8" : "#e11d48",
        transition: "0.2s",
    });

    return (
        <div style={cardStyle}>
            <div style={{ marginBottom: "20px" }}>
                <h2 style={{ margin: 0, color: "#111827", fontSize: "24px" }}>Admin Management</h2>
                <p style={{ color: "#6b7280", fontSize: "14px" }}>Manage system users and their permissions.</p>
            </div>

            <table style={tableWrapperStyle} className="table table-striped">
                <thead>
                    <tr>
                        <th style={thStyle}>No</th>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Phone</th>
                        <th style={thStyle}>Status</th>
                        <th style={thStyle}>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {allAdmin.map((admin, index) => (
                        <tr key={index}>
                            <td style={tdStyle}>{index + 1}</td>
                            <td style={{ ...tdStyle, fontWeight: "500", color: "#111827" }}>{admin.name}</td>
                            <td style={tdStyle}>{admin.email}</td>
                            <td style={tdStyle}>{admin.phone}</td>
                            <td style={tdStyle}>
                                <span style={badgeStyle(admin.isActive)}>
                                    {admin.isActive ? "Active" : "Inactive"}
                                </span>
                            </td>
                            <td style={tdStyle}>
                                <button style={btnStyle("edit")}>✏️Edit</button>
                                <button style={btnStyle("delete")}>🗑️Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}