import { FaGraduationCap } from "react-icons/fa";

const ApplicationLogo = (props) => (
  <div className="flex items-center space-x-2 text-xl font-bold" {...props}>
    <FaGraduationCap className="text-blue-500" />
    <span>
      Jaspe <span className="font-light text-gray-600">Academy</span>
    </span>
  </div>
);

export default ApplicationLogo;
