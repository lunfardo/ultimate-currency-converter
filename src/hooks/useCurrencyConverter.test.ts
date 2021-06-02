import { act, renderHook } from "@testing-library/react-hooks";
import { useCurrencyConverter } from "./useCurrencyConverter";
import * as useRatesDataModule from "./useRatesData";

const BASE_RATE = 1;

const mock_useRatesData = {
  "CRRY1-CRRY2": { CRRY1: BASE_RATE, CRRY2: BASE_RATE * 2 },
};

describe("Currency Converter Hook", () => {
  it("Converts currencies correctly based on given rates", async () => {
    jest
      .spyOn(useRatesDataModule, "useRatesData")
      .mockImplementation(() => mock_useRatesData);

    const TEST_AMOUNT = 2;
    const { result } = renderHook(() =>
      useCurrencyConverter("CRRY1", "CRRY2", new Date(), 2)
    );
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    expect(result.current.result).toStrictEqual(2 * TEST_AMOUNT);
  });
});
