import "../styles/rule-content-screen.css";
import StringsCale from "../constants/strings.js";
import reglamento1 from "../assets/reglamento1.jpg";
import reglamento2 from "../assets/reglamento2.jpg";

function RuleContent() {
    const strings = StringsCale();

  return (
    <section className="rule-content">
      <img src={reglamento1} alt={strings.altRuleProtocol} className="rule-image" />
      <img src={reglamento2} alt={strings.altRuleComputerCenter} className="rule-image" />
    </section>
  );
}

export default RuleContent;