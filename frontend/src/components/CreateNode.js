import { BaseNode } from "./BaseNode";

export const createNode = (config) => {
  return ({ id, data }) => <BaseNode id={id} data={data} config={config} />;
};
