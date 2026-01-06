# 🏥 Proyecto App Prepaga

## 📌 Descripción general

Este proyecto consiste en el desarrollo de una **aplicación de gestión de una prepaga de salud**, orientada a simular un sistema real de negocio para aplicar conceptos de **análisis de sistemas, modelado de datos y desarrollo backend**.

La aplicación permite administrar afiliados, planes, turnos médicos, historia clínica, prestaciones, facturación y beneficios, siguiendo reglas de negocio similares a las utilizadas por prepagas reales.

El sistema se desarrolla inicialmente como **arquitectura monolítica**, con la idea de **migrar a microservicios en una etapa posterior**.

---

## 🎯 Objetivos del proyecto

* Aplicar conceptos de **ingeniería de software** y **análisis de negocio**.
* Diseñar un **modelo de datos robusto y realista**.
* Implementar un backend escalable y mantenible.
* Simular procesos reales de una prepaga (turnos, consultas, estudios, facturación).
* Servir como **proyecto demostrable** para entrevistas laborales en el área backend.

---

## 🧠 Alcance funcional

### 👤 Afiliados

* Alta, baja y modificación de afiliados.
* Asociación de afiliados a planes (histórico de planes).
* Gestión de estado del afiliado (habilitado / suspendido).

### 📄 Planes y beneficios

* Gestión de planes de salud.
* Asociación de beneficios a planes.
* Beneficios reutilizables entre distintos planes.
* Definición de descuentos y vigencias.

### 🗓️ Turnos médicos

* Asignación de turnos entre afiliados y especialistas.
* Estados de turno (pendiente, cancelado, atendido, ausente, etc.).

### 🩺 Historia clínica

* Historia clínica única por afiliado.
* Registro clínico por cada atención médica.
* Asociación de registros clínicos a turnos.

### 💊 Prestaciones

* Registro de prestaciones realizadas durante una atención:

  * Consultas
  * Tratamientos
  * Medicamentos
  * Estudios
* Cantidad, receta e indicaciones.

### 🧪 Estudios

* Estudios médicos como un tipo de prestación.
* Registro de resultados (texto o archivo adjunto).

### 💰 Facturación

* Generación de facturas mensuales por afiliado.
* Ítems de factura:

  * Cuota del plan
  * Consultas
  * Prestaciones
  * Estudios
  * Ítems manuales (gastos externos)
* Soporte para carga manual validada por administrativos.
* Cálculo de importes y totales.



## 🛠️ Tecnologías

### Backend

* **Node.js**
* **TypeScript**
* **Express**

### Base de datos

* **Oracle (PL/SQL)**
* Docker para entorno local

### Herramientas

* Git
* Docker
* Postman

---

## 🧱 Arquitectura

* Arquitectura **monolítica** en esta primera etapa.
* Separación por capas:

  * Controllers
  * Services
  * Repositories
  * Domain / Models
* Diseño preparado para futura **migración a microservicios** (facturación, turnos, historia clínica).

---

## 👤 Autor

**Facundo Speranza**
Estudiante de Ingeniería en Sistemas
Perfil orientado a backend, análisis y diseño de sistemas.
