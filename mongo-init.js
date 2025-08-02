db = db.getSiblingDB("your_db_name");

// 🔸 Usuarios de prueba
db.users.insertMany([
  { _id: ObjectId("64eacbf01d1f0001aa000001"), name: "Ana", email: "ana@example.com" },
  { _id: ObjectId("64eacbf01d1f0001aa000002"), name: "Luis", email: "luis@example.com" }
]);

// 🔸 Reto de tipo diario
db.challenges.insertOne({
  _id: ObjectId("64eacbf01d1f0001aa100001"),
  name: "Dormir bien 3 días",
  type: "sleep",
  goal: 0,
  goalType: "daily",
  dailyGoal: 8,
  requiredDays: 3,
  startDate: ISODate("2025-08-01T00:00:00Z"),
  endDate: ISODate("2025-08-07T23:59:59Z")
});

// 🔸 Inscripciones de usuarios
db.userchallenges.insertMany([
  {
    _id: ObjectId("64eacbf01d1f0001aa200001"),
    userId: ObjectId("64eacbf01d1f0001aa000001"),
    challengeId: ObjectId("64eacbf01d1f0001aa100001"),
    total: 0,
    progress: 0
  },
  {
    _id: ObjectId("64eacbf01d1f0001aa200002"),
    userId: ObjectId("64eacbf01d1f0001aa000002"),
    challengeId: ObjectId("64eacbf01d1f0001aa100001"),
    total: 0,
    progress: 0
  }
]);

// 🔸 Métricas de salud (sleep por día)
db.healthmetrics.insertMany([
  // Ana duerme 8+ horas tres veces
  { userId: ObjectId("64eacbf01d1f0001aa000001"), type: "sleep", date: ISODate("2025-08-01T00:00:00Z"), value: 8 },
  { userId: ObjectId("64eacbf01d1f0001aa000001"), type: "sleep", date: ISODate("2025-08-02T00:00:00Z"), value: 7 },
  { userId: ObjectId("64eacbf01d1f0001aa000001"), type: "sleep", date: ISODate("2025-08-03T00:00:00Z"), value: 8 },
  { userId: ObjectId("64eacbf01d1f0001aa000001"), type: "sleep", date: ISODate("2025-08-04T00:00:00Z"), value: 9 },

  // Luis duerme suficiente solo dos veces
  { userId: ObjectId("64eacbf01d1f0001aa000002"), type: "sleep", date: ISODate("2025-08-01T00:00:00Z"), value: 6 },
  { userId: ObjectId("64eacbf01d1f0001aa000002"), type: "sleep", date: ISODate("2025-08-02T00:00:00Z"), value: 8 },
  { userId: ObjectId("64eacbf01d1f0001aa000002"), type: "sleep", date: ISODate("2025-08-04T00:00:00Z"), value: 8 }
]);
