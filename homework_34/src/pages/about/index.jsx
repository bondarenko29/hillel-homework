const AboutPage = () => {
  return (
    <section>
      <h2 className="text-3xl font-bold text-yellow-400 mb-6">About the Project</h2>

      <p className="text-white text-lg mb-6 leading-relaxed">
        <strong>BookingApp</strong> is a modern and minimalistic hotel browsing experience built for
        educational purposes. Imagine you're planning a spontaneous trip — this app lets you explore
        available hotels with ease, get quick details, and prepare to book… all with a smooth and
        stylish interface.
      </p>

      <p className="text-white text-lg mb-6 leading-relaxed">
        This project was created as part of a front-end development learning module, but it's
        intentionally designed to simulate real-world architecture, best practices, and clean code
        principles. From modular structure to reusable components — the goal is not just to make it
        work, but to make it scalable, readable, and easy to build upon.
      </p>

      <h3 className="text-xl font-semibold text-yellow-300 mb-3">🔧 Tech Stack:</h3>
      <ul className="list-disc list-inside text-white text-base mb-6 space-y-1">
        <li>
          ⚡ <strong>React + Vite</strong> — fast, modern tooling
        </li>
        <li>
          🌐 <strong>React Router</strong> with <code>createBrowserRouter</code>
        </li>
        <li>
          🎨 <strong>TailwindCSS</strong> — fully dark-themed UI
        </li>
        <li>
          📡 <strong>Axios + json-server</strong> — fake REST API
        </li>
        <li>
          📝 <strong>react-hook-form</strong> — elegant form handling
        </li>
        <li>
          🧼 <strong>ESLint + Prettier</strong> — keeping code clean & consistent
        </li>
      </ul>

      <h3 className="text-xl font-semibold text-yellow-300 mb-3">🎯 Why this project matters:</h3>
      <p className="text-white text-lg mb-6 leading-relaxed">
        Too often tutorials skip the boring (yet important) parts — like code organization, file
        structure, or consistent styling rules. This project is different: we aim to teach how to
        build something functional **and** professional. That means readable components, split
        logic, environment variables, and a reusable folder system.
      </p>

      <h3 className="text-xl font-semibold text-yellow-300 mb-3">👨‍💻 Author:</h3>
      <p className="text-white text-lg leading-relaxed">
        Built with love and a passion for teaching clean code. If you're reading this, you're
        already leveling up — keep going! 🚀
      </p>
    </section>
  );
};

export default AboutPage;
