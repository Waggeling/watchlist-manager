import { useNavigate, useParams } from "react-router-dom";

function HOCForRouteProps({ Component }) {
  const navigate = useNavigate();
  const params = useParams();
  return <Component navigate={navigate} params={params} />;
}

export default HOCForRouteProps;
