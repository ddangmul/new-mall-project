import { formatterPrice } from "./formatter";

describe("formatterPrice", () => {
  test("숫자를 한국 원화(KRW) 형식으로 포맷", () => {
    const price1 = 1234567;
    const price2 = 5000;
    const price3 = 0;

    expect(formatterPrice(price1)).toBe("₩1,234,567");
    expect(formatterPrice(price2)).toBe("₩5,000");
    expect(formatterPrice(price3)).toBe("₩0");
  });

  test("음수 값 처리", () => {
    const price = -1234567;
    expect(formatterPrice(price)).toBe("-₩1,234,567");
  });

  test("0 처리", () => {
    const price = 0;
    expect(formatterPrice(price)).toBe("₩0");
  });
});
