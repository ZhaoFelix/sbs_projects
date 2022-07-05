import { ElMessage } from "element-plus";

// 消息
const Message = (message: string): any => {
  return ElMessage({
    showClose: true,
    message,
    duration:2000
  });
};

// 成功
const successMessage = (message: string): any => {
  return ElMessage({
    showClose: true,
    message,
    type: "success",
    duration:2000
  });
};

// 警告
const warnMessage = (message: string): any => {
  return ElMessage({
    showClose: true,
    message,
    type: "warning",
    duration:2000
  });
};

// 失败
const errorMessage = (message: string): any => {
  return ElMessage({
    showClose: true,
    message,
    type: "error",
    duration:2000
  });
};

export { Message, successMessage, warnMessage, errorMessage };
