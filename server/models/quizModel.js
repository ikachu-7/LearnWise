const { Schema, model } = require("mongoose");

const quizSchema = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    questions: [
      {
        question: {
          type: String,
          required: true,
        },
        options: [
          {
            type: String,
            required: true,
          },
        ],
        answer: {
          type: Number,
          required: true,
        },
      },
    ],
    students: [
      {
        student: {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
        score: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

const quizModel = model("quiz", quizSchema);

module.exports = quizModel;
