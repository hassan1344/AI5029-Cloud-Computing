const express = require("express");
const AWS = require("aws-sdk");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "todo-list";

//for ELB health checker
app.get("/", async (req, res) => {
  res.status(200).json({ message: "Service is availaible..." });
});

app.post("/tasks", async (req, res) => {
  const { id, text, date, reminder } = req.body;

  if (!id || !text || !date || reminder === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: id,
      text: text,
      date: date,
      reminder: reminder,
    },
  };

  try {
    await dynamoDb.put(params).promise();
    res
      .status(201)
      .json({ message: "Record created successfully", item: params.Item });
  } catch (error) {
    console.error("Error creating record:", error);
    res.status(500).json({ error: "Could not create record" });
  }
});

app.get("/tasks", async (req, res) => {
  const params = {
    TableName: TABLE_NAME,
  };

  try {
    const data = await dynamoDb.scan(params).promise();

    res.status(200).json({ items: data.Items });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Could not fetch tasks" });
  }
});

app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params; // Get the id from the URL parameter

  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: id, // Specify the partition key
    },
  };

  try {
    const data = await dynamoDb.get(params).promise();
    if (!data.Item) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ item: data.Item });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Could not fetch task" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params; // Get the id from the URL parameter
  const { reminder } = req.body; // Get the reminder from the request body



  if (reminder === undefined) {
    return res.status(400).json({ error: "Missing required field: reminder" });
  }

  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: id, // Specify the partition key
    },
    UpdateExpression: "set reminder = :r", // Update expression to modify the reminder field
    ExpressionAttributeValues: {
      ":r": reminder, // Value to set for the reminder field
    },
    ReturnValues: "UPDATED_NEW", // Return the updated item
  };

  try {
    const data = await dynamoDb.update(params).promise();
    res.status(200).json({
      message: "Record updated successfully",
      item: data.Attributes, // Return the updated attributes
    });
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).json({ error: "Could not update record" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params; // Get the id from the URL parameter

  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: id, // Specify the partition key
    },
  };

  try {
    const data = await dynamoDb.delete(params).promise();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Could not delete task" });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
