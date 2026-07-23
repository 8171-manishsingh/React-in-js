export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        &copy; {new Date().getFullYear()} Product Management System. Built with <span>React</span>.
      </div>
    </footer>
  );
}

