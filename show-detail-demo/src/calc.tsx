import { Detail, LaunchProps } from "@raycast/api";

export default function Command(props: LaunchProps) {
  const { param } = props.arguments;
  const price = Math.floor(param);
  const tax = Math.floor(price * 0.1);
  let gensen = 0;

  if (price <= 1000000) {
    gensen = Math.floor(price * 10.21 / 100);
  } else {
    gensen = Math.floor((price - 1000000) * 20.42 / 100) + 102100;
  }

  const total = price + tax - gensen;
  const markdown = `# 計算結果

| 項目 | 金額 |
| :--|--:|
| 税抜 | &yen;${price.toLocaleString()} |
| 消費税 | &yen;${tax.toLocaleString()} |
| 源泉徴収税額 | &yen;${gensen.toLocaleString()} |
| 請求合計 | &yen;${total.toLocaleString()} |
`;

  return (
    <Detail
      markdown={markdown}
    />
  );
}
