import { getImagesQuery } from "../../lib/queries";
import QueryPage from "../index";
export default QueryPage;
export const getServerSideProps = getImagesQuery;
