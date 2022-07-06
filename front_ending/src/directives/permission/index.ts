import { usePermissionStoreHook } from "/@/store/modules/permission";
import { Directive } from "vue";
import type { DirectiveBinding } from "vue";

export const auth: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;
    if (value) {
      console.log("当前角色类型："+value)
      const authRoles = value;
      console.log(usePermissionStoreHook().buttonAuth)
      const hasAuth = usePermissionStoreHook().buttonAuth.includes(authRoles);
      if (!hasAuth) {
        el.parentNode.removeChild(el);
      }
    } else {
      throw new Error("need roles! Like v-auth=\"['admin','test']\"");
    }
  }
};
