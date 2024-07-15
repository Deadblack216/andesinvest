import { useEffect } from "react";
import { useTasks } from "../context/tasksContext";
import { TaskCard } from "../components/tasks/TaskCard";
import { ImFileEmpty } from "react-icons/im";

export function TasksPage() {
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div style={{ minHeight: "100vh", position: "relative", backgroundColor: "#d9dbd2",paddingBottom: "100px" }}>
      <header style={{
        background: "linear-gradient(90deg, rgba(37,99,235,1) 0%, rgba(59,130,246,1) 50%, rgba(37,99,235,1) 100%)",
        color: "white",
        textAlign: "center",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease-in-out",
        transform: "scale(1)",
        ':hover': {
          transform: "scale(1.05)"
        }
      }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}>Bienvenido a AndesInvest</h1>
        <p style={{ fontSize: "1.25rem", textShadow: "1px 1px 3px rgba(0, 0, 0, 0.1)" }}>Gestiona tus cuentas de manera eficiente</p>
      </header>

      <main style={{ padding: "20px", textAlign: "center" }}>
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2563eb" }}>Tu banco, tu futuro</h2>
          <p style={{ fontSize: "1.25rem", color: "#4b5563" }}>Con AndesInvest, tienes el control total de tus finanzas.</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              transition: "all 0.3s ease",
              ':hover': {
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)"
              }
            }}>
              <img src="/public/bienvenidaAndes.jpg" alt="Banco" style={{ width: "100%", borderRadius: "10px" }} />
            </div>
          </div>
        </section>
        
        <section style={{ marginBottom: "40px" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#2563eb" }}>Nuestros Servicios</h3>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
            <div style={{
              backgroundColor: "#d1e7dd",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              width: "300px",
              transition: "transform 0.3s",
              cursor: "pointer"
            }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              <h4 style={{ fontSize: "1rem", fontWeight: "bold", color: "#0f5132" }}>Transacciones Seguras</h4>
              <p style={{ fontSize: "1rem", color: "#155724" }}>Tu seguridad es nuestra prioridad. Con AndesInvest, tus transacciones están siempre protegidas.</p>
            </div>
            <div style={{
              backgroundColor: "#cff4fc",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              width: "300px",
              transition: "transform 0.3s",
              cursor: "pointer"
            }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              <h4 style={{ fontSize: "1rem", fontWeight: "bold", color: "#055160" }}>Pago de servicios fácil y rápido</h4>
              <p style={{ fontSize: "1rem", color: "#0c5460" }}>Paga tus servicios de manera rápida y sencilla con AndesInvest.</p>
            </div>
            <div style={{
              backgroundColor: "#fff3cd",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              width: "300px",
              transition: "transform 0.3s",
              cursor: "pointer"
            }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              <h4 style={{ fontSize: "1rem", fontWeight: "bold", color: "#856404" }}>Atención Personalizada</h4>
              <p style={{ fontSize: "1rem", color: "#856404" }}>Nuestro equipo de soporte está siempre disponible para ayudarte en lo que necesites.</p>
            </div>
            <div style={{
              backgroundColor: "#cce5ff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              width: "300px",
              transition: "transform 0.3s",
              cursor: "pointer"
            }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              <h4 style={{ fontSize: "1rem", fontWeight: "bold", color: "#004085" }}>Soporte 24/7</h4>
              <p style={{ fontSize: "1rem", color: "#004085" }}>Estamos aquí para ti, a cualquier hora del día o de la noche.</p>
            </div>
            <div style={{
              backgroundColor: "#d4edda",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              width: "300px",
              transition: "transform 0.3s",
              cursor: "pointer"
            }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              <h4 style={{ fontSize: "1rem", fontWeight: "bold", color: "#155724" }}>Crea una cuenta segura</h4>
              <p style={{ fontSize: "1rem", color: "#155724" }}>Abre tu cuenta en AndesInvest de forma rápida y segura.</p>
            </div>
            <div style={{
              backgroundColor: "#f8d7da",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              width: "300px",
              transition: "transform 0.3s",
              cursor: "pointer"
            }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              <h4 style={{ fontSize: "1rem", fontWeight: "bold", color: "#721c24" }}>Síguenos en nuestras redes sociales</h4>
              <p style={{ fontSize: "1rem", color: "#721c24" }}>Mantente al día con las últimas novedades siguiéndonos en nuestras redes sociales.</p>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ backgroundColor: "#2563eb", color: "white", textAlign: "center", padding: "10px", position: "absolute", bottom: "0", width: "100%" }}>
        <p>&copy; 2024 AndesInvest. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
