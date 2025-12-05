# Proyecto App Prepaga

## 🎯 Objetivo
Desarrollar un sistema básico de gestión para una prepaga de salud, simulando un entorno real, con el fin de aplicar conocimientos técnicos y demostrar habilidades en diseño, desarrollo backend, manejo de base de datos y reglas de negocio.

La aplicación permitirá:
- Administrar afiliados y sus planes de salud
- Gestionar especialidades y especialistas
- Asignar turnos médicos
- Calcular pagos, descuentos y sueldos
- Enviar notificaciones automáticas por email

---

## 🏥 Descripción del sistema

La prepaga cuenta con un sistema de afiliados que eligen entre distintos planes de salud. Cada plan posee beneficios específicos, como porcentajes de descuento en consultas médicas y medicamentos.

El sistema se encargará de:

- Administrar afiliados con sus respectivos planes
- Llevar un historial de consumos (consultas y medicamentos)
- Gestionar turnos médicos con especialistas
- Calcular el sueldo de los especialistas (sueldo base + % por consulta)
- Manejar la facturación mensual del afiliado

### 📅 Turnos

- Cada turno tiene una duración de **20 minutos**
- Se pueden asignar turnos hasta **4 meses en adelante**
- Se notificará al afiliado por email **48 horas antes del turno**, indicando:
  - Fecha
  - Hora
  - Especialista

---

## 💳 Pagos y facturación

- Las consultas y medicamentos pueden:
  - Pagarse en el momento
  - O acumularse en la factura mensual del plan
- Cada **30 días desde el primer pago**, el afiliado deberá abonar su plan
- Se enviará una notificación por email con:
  - Importe
  - Nombre del plan
- El afiliado tendrá un plazo de **10 días** para pagar antes de quedar **sin beneficios (inhabilitado)**

---

## 📚 Entidades principales

### Usuario
- Rango (admin / afiliado / especialista)
- Usuario
- Contraseña
- Afiliado (si corresponde)
- Especialista (si corresponde)

### Afiliado
- Número de afiliado  
- Nombre  
- Apellido  
- Plan  
- Estado (habilitado / inhabilitado)  
- Deuda  
- Historial de consumos  
- Email  
- Fecha de alta  

### Especialista
- Número de matrícula  
- Especialidad  
- Nombre  
- Apellido  
- Historial de pacientes  
- Sueldo base  

### Plan
- Costo  
- Descripción de beneficios  
- Porcentaje de descuento en consultas  
- Porcentaje de descuento en medicamentos  
- Beneficios (internación, visitas médicas, etc)  

### Turno
- Fecha y hora  
- Especialista  
- Afiliado (si está asignado)  

### Especialidad
- Descripción  
- Turnos disponibles  
- Especialistas asociados  

---

## ⚙️ Funcionalidades principales

✅ Validación de usuarios  
✅ Asignación de turnos  
✅ Notificación de turnos por email  
✅ Notificación de vencimiento del plan  
✅ Cálculo automático del valor de prestaciones  
✅ Cálculo del sueldo del especialista  
✅ Control de estado del afiliado (habilitado / inhabilitado)  

---

## 🧪 Reglas de negocio importantes

- Un afiliado solo puede sacar turnos si está **habilitado**
- Un especialista sólo puede atender turnos de su especialidad
- Si el afiliado no paga dentro del plazo, pasa a estado **inhabilitado**
- Los descuentos dependen del plan contratado
- El sueldo del especialista se calcula por:
  ```
  sueldo = sueldo_base + (consultas_realizadas * porcentaje)
  ```

---

## 🛠 Tecnologías utilizadas

**Backend**
- Node.js
- TypeScript
- Express

**Base de Datos**
- Oracle / PL SQL
- Docker

**Otros**
- Git / GitHub
- Nodemailer (para notificaciones)
- Arquitectura REST
- Posible implementación futura de microservicios

**Frontend (a definir)**
- Angular / React / Next.js (opcional)
