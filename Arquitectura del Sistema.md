git # 🧱 Arquitectura del Sistema

## 📌 Visión general

La aplicación **App Prepaga** se diseña inicialmente bajo una **arquitectura monolítica**, priorizando:

* Simplicidad de desarrollo
* Claridad en las reglas de negocio
* Facilidad de mantenimiento y escalabilidad
* Base sólida para una futura migración a microservicios


---

## 🏗️ Estilo arquitectónico

### Arquitectura monolítica por capas

El sistema se organiza siguiendo una separación clara de responsabilidades:

```
Controller  →  Service  →  Repository  →  Model
```

Cada capa cumple una función específica:

### 🎮 Controllers

* Validan datos de entrada.
* Orquestan la ejecución de los casos de uso.
* No contienen lógica de negocio.

### 🧠 Services

* Contienen la **lógica de negocio**.
* Implementan reglas del dominio (facturación, validaciones, cálculos).
* Coordinan múltiples repositorios si es necesario.

### 🗄️ Repositories

* Encapsulan el acceso a datos.
* Ejecutan consultas SQL / PL/SQL.
* Aíslan la base de datos del resto del sistema.

### 🧩  Models

* Representan las entidades del negocio.
* Reflejan el modelo definido en el DER.
* No dependen de frameworks.

---



## 🔁 Flujo típico de un caso de uso

### Ejemplo: Atención médica y facturación

1. El afiliado solicita un turno.
2. Se registra el turno.
3. El especialista atiende al afiliado.
4. Se genera un Registro Clínico asociado al turno.
5. Se registran prestaciones y estudios realizados.
6. El sistema genera los ítems facturables.
7. Se emite la factura mensual.

---

## 💰 Arquitectura de facturación

La facturación está **desacoplada del acto clínico**:

* Las prestaciones clínicas generan **datos**, no facturas.
* La facturación se realiza posteriormente mediante:

  * Registros clínicos
  * Prestaciones
  * Ítems administrativos manuales

Esto permite:

* Facturar gastos externos (farmacias, terceros)
* Ajustes manuales

---



## 🛠️ Stack tecnológico

* Backend: Node.js + TypeScript + Express
* Base de datos: Oracle (PL/SQL)
* Contenedores: Docker

---

## 🎯 Objetivo de la arquitectura

Proveer una base:

* Clara
* Escalable
* Mantenible

Que permita demostrar **criterio arquitectónico**, no solo conocimiento técnico.

---

## Nota 

Esta arquitectura prioriza la comprensión del dominio y la calidad del diseño por sobre la complejidad técnica innecesaria.
