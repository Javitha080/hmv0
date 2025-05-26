function toggleAnswer(id) {
  const answer = document.getElementById(id);
  answer.style.display = (answer.style.display === "none") ? "block" : "none";
}
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#4f46e5',
      },
    },
  },
  plugins: [],
}