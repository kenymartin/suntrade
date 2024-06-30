import { NotificationType } from "../../shared/utils/enums";

interface INofication {
  send(): Promise<void>;
}
export default INofication
