require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const QRCode = require("qrcode");

const app = express();

app.use(cors());
app.use(express.json());

/* -----------------------
   MongoDB Connection
----------------------- */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* -----------------------
   Event Model
----------------------- */

const EventSchema = new mongoose.Schema({
  title: String,
  location: String,
  date: String,
});

const Event = mongoose.model("Event", EventSchema);

/* -----------------------
   Ticket Model
----------------------- */

const TicketSchema = new mongoose.Schema({
  eventId: String,
  userName: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Ticket = mongoose.model("Ticket", TicketSchema);

/* -----------------------
   Routes
----------------------- */


/* Get all events */

app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});


/* Book ticket + generate QR */

app.post("/tickets", async (req, res) => {
  try {
    const { eventId, userName } = req.body;

    const ticket = new Ticket({
      eventId,
      userName,
    });

    await ticket.save();

    const qrData = JSON.stringify({
      ticketId: ticket._id,
      eventId: ticket.eventId,
    });

    const qrCode = await QRCode.toDataURL(qrData);

    res.json({
      message: "Ticket booked successfully",
      ticket,
      qrCode,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to book ticket" });
  }
});


/* Verify ticket from QR */

app.get("/tickets/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.json({ valid: false });
    }

    res.json({
      valid: true,
      ticket,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Verification failed" });
  }
});


/* -----------------------
   Start Server
----------------------- */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});