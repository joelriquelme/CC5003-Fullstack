import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { api } from "../../../services/httpService";
import { useAuth } from "../../../services/useAuth";

export default function AdminPanel() {
  const { user, loading } = useAuth();
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Departamento
  const [deptCode, setDeptCode] = useState("");
  const [deptName, setDeptName] = useState("");
  const [gold, setGold] = useState<string>("");
  const [silver, setSilver] = useState<string>("");
  const [bronze, setBronze] = useState<string>("");
  const [points, setPoints] = useState<string>("");

  // Disciplina
  const [discName, setDiscName] = useState("");
  const [discIcon, setDiscIcon] = useState("Fútbol");
  const [discDays, setDiscDays] = useState("");

  // Puntajes
  const [pCode, setPCode] = useState("");
  const [pDiscipline, setPDiscipline] = useState("");
  const [PJ, setPJ] = useState<string>("");
  const [PG, setPG] = useState<string>("");
  const [PE, setPE] = useState<string>("");
  const [PP, setPP] = useState<string>("");

  const submitDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setError(null);
    try {
      const body = {
        code: deptCode,
        name: deptName,
        gold: Number(gold) || 0,
        silver: Number(silver) || 0,
        bronze: Number(bronze) || 0,
        points: Number(points) || 0,
      };
      await api.post("/medalTable", body);
      setStatus("Departamento creado correctamente");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Error creando departamento");
    }
  };

  const submitDiscipline = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setError(null);
    try {
      const days = discDays.split(",").map((s) => s.trim()).filter(Boolean);
      const body = { name: discName, icon: discIcon, days };
      await api.post("/disciplinas", body);
      setStatus("Disciplina creada correctamente");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Error creando disciplina");
    }
  };

  const submitPuntaje = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setError(null);
    try {
      const body = {
        code: pCode,
        discipline: pDiscipline,
        PJ: Number(PJ) || 0,
        PG: Number(PG) || 0,
        PE: Number(PE) || 0,
        PP: Number(PP) || 0,
      };
      await api.post("/puntajesPorDisciplina", body);
      setStatus("Registro de puntaje creado correctamente");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Error creando puntaje");
    }
  };

  if (loading) return <p className="text-center py-5">Cargando sesión...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="bg-white" style={{ minHeight: "100vh" }}>
      <div
        className="container"
        style={{
          padding: 30,
          fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
          backgroundColor: "#ffffff",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <h1
          className="title"
          style={{
            textAlign: "center",
            fontSize: "2.2rem",
            fontWeight: "bold",
            color: "#ff0000",
            marginBottom: "1.5rem",
            textTransform: "uppercase",
            borderBottom: "3px solid #ff0000",
            paddingBottom: "6px",
            width: "fit-content",
          }}
        >
          Panel de administración
        </h1>

        <p className="text-center text-muted mb-4">
          Bienvenido{user?.username ? `, ${user.username}` : ""}. Desde aquí puedes agregar departamentos, disciplinas y puntajes.
        </p>

        <Row className="g-4">
          <Col xs={12} lg={4}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title className="mb-3">Crear Departamento</Card.Title>
                <Form onSubmit={submitDepartment}>
                  <Form.Group className="mb-2" controlId="deptCode">
                    <Form.Label className="small">Código</Form.Label>
                    <Form.Control value={deptCode} onChange={(e) => setDeptCode(e.target.value)} placeholder="ING" required />
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="deptName">
                    <Form.Label className="small">Nombre</Form.Label>
                    <Form.Control value={deptName} onChange={(e) => setDeptName(e.target.value)} placeholder="Ingeniería Civil" required />
                  </Form.Group>

                  <Row className="mb-3 gx-2">
                    <Col xs={4}><Form.Control type="number" min={0} value={gold} onChange={(e) => setGold(e.target.value)} placeholder="Gold" /></Col>
                    <Col xs={4}><Form.Control type="number" min={0} value={silver} onChange={(e) => setSilver(e.target.value)} placeholder="Silver" /></Col>
                    <Col xs={4}><Form.Control type="number" min={0} value={bronze} onChange={(e) => setBronze(e.target.value)} placeholder="Bronze" /></Col>
                  </Row>

                  <Form.Group className="mb-3" controlId="points">
                    <Form.Control type="number" min={0} value={points} onChange={(e) => setPoints(e.target.value)} placeholder="Puntos" />
                  </Form.Group>

                  <div className="d-grid">
                    <Button type="submit" variant="danger" size="md">Crear Departamento</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} lg={4}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title className="mb-3">Crear Disciplina</Card.Title>
                <Form onSubmit={submitDiscipline}>
                  <Form.Group className="mb-2" controlId="discName">
                    <Form.Label className="small">Nombre</Form.Label>
                    <Form.Control value={discName} onChange={(e) => setDiscName(e.target.value)} placeholder="Básquetbol Masculino" required />
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="discIcon">
                    <Form.Label className="small">Ícono / Tipo</Form.Label>
                    <Form.Select value={discIcon} onChange={(e) => setDiscIcon(e.target.value)}>
                      <option>Fútbol</option>
                      <option>Tenis</option>
                      <option>Básquetbol</option>
                      <option>Natación</option>
                      <option>Taca-Taca</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="discDays">
                    <Form.Label className="small">Días (coma separado)</Form.Label>
                    <Form.Control value={discDays} onChange={(e) => setDiscDays(e.target.value)} placeholder="Lun 01, Mar 02" />
                  </Form.Group>

                  <div className="d-grid">
                    <Button type="submit" variant="danger">Crear Disciplina</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} lg={4}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title className="mb-3">Crear Puntaje por Disciplina</Card.Title>
                <Form onSubmit={submitPuntaje}>
                  <Form.Group className="mb-2" controlId="pCode">
                    <Form.Label className="small">Código carrera</Form.Label>
                    <Form.Control value={pCode} onChange={(e) => setPCode(e.target.value)} placeholder="ING" required />
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="pDiscipline">
                    <Form.Label className="small">Disciplina</Form.Label>
                    <Form.Control value={pDiscipline} onChange={(e) => setPDiscipline(e.target.value)} placeholder="Fútbol" required />
                  </Form.Group>

                  <Row className="mb-3 gx-2">
                    <Col xs={3}><Form.Control type="number" min={0} value={PJ} onChange={(e) => setPJ(e.target.value)} placeholder="PJ" /></Col>
                    <Col xs={3}><Form.Control type="number" min={0} value={PG} onChange={(e) => setPG(e.target.value)} placeholder="PG" /></Col>
                    <Col xs={3}><Form.Control type="number" min={0} value={PE} onChange={(e) => setPE(e.target.value)} placeholder="PE" /></Col>
                    <Col xs={3}><Form.Control type="number" min={0} value={PP} onChange={(e) => setPP(e.target.value)} placeholder="PP" /></Col>
                  </Row>

                  <div className="d-grid">
                    <Button type="submit" variant="danger">Crear Puntaje</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {status && <Alert variant="success" className="mt-4">{status}</Alert>}
        {error && <Alert variant="danger" className="mt-4">{error}</Alert>}
      </div>
    </div>
  );
}