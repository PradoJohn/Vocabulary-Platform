import { Row } from "react-bootstrap";

const Footer = () => {
  const footerStyle = {
    position: "fixed",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Set your desired background color
    padding: "10px",
    textAlign: "center",
  };

  return (
    <Row style={footerStyle}>
      <p>&copy; 2023 WordVibe. All rights reserved.</p>
    </Row>
  );
};

export default Footer;
