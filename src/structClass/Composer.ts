import Controller from "../Element/Controller";
import Context from "./Context";

type Composer = (controllers : Controller[], context : Context) => any

export default Composer;