import { useState } from "react";
const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [reminder, setReminder] = useState(false);
  const [date, setDate] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert("Pleasse add task");
      return;
    }

    onAdd({ text, date, reminder });
    setText("");
    setReminder(false);
    setDate("");
  };
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="form-control">
        <input
          type="text"
          placeholder="Add Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          placeholder="Set Reminder"
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>
      <div className="btn btn-block">
        <input type="submit" value="Save Task" />
      </div>
    </form>
  );
};

export default AddTask;
