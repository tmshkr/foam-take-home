import { getImagesQuery } from "src/lib/queries";
import QueryPage from "pages/index";
export default QueryPage;
export const getServerSideProps = getImagesQuery;
