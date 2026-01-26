export default function SuccessPopUp({ message }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "0px",
        background: "#4caf50",
        color: "white",
        padding: "12px 20px",
        borderRadius: "6px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        zIndex: 9999,
      }}
    >
      {message}
    </div>
  );
}