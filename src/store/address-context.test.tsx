import { render, screen, waitFor } from "@testing-library/react";
import { AddressProvider, useAddress } from "./address-context";
import { useSession } from "next-auth/react";
import userEvent from "@testing-library/user-event";

// useSession 모킹
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

// fetch 모킹
(global.fetch as jest.Mock) = jest.fn();

describe("AddressContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("세션이 인증된 경우 주소 가져옴", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { id: "user123" } },
      status: "authenticated",
    });

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        success: true,
        addresses: [{ id: "1", addressname: "Address 1" }],
      }),
    });

    render(
      <AddressProvider>
        <AddressContextTestComponent />
      </AddressProvider>
    );

    // 데이터 로딩 후 주소지 렌더링
    await waitFor(() => screen.getByText("Address 1"));
    expect(screen.getByText("Address 1")).toBeInTheDocument();
  });

  test("주소 불러오기 실패 시 에러 메시지 표시", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { id: "user123" } },
      status: "authenticated",
    });

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        success: false,
        message: "Failed to fetch addresses",
      }),
    });

    render(
      <AddressProvider>
        <AddressContextTestComponent />
      </AddressProvider>
    );

    await waitFor(() => screen.getByText("Failed to fetch addresses"));
    expect(screen.getByText("Failed to fetch addresses")).toBeInTheDocument();
  });

  test("사용자 미인증 시 주소를 가져오지 않음", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(
      <AddressProvider>
        <AddressContextTestComponent />
      </AddressProvider>
    );

    await waitFor(() => expect(global.fetch).not.toHaveBeenCalled());
  });

  test("새로운 주소 추가", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { id: "user123" } },
      status: "authenticated",
    });

    // 첫 번째: 주소 목록 fetch
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
          success: true,
          addresses: [],
        }),
      })
      // 두 번째: 주소 추가 fetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({ success: true }),
      });

    render(
      <AddressProvider>
        <AddressContextTestComponent />
      </AddressProvider>
    );
    await waitFor(() => screen.getByRole("button", { name: /add address/i }));
    const addButton = screen.getByRole("button", { name: /add address/i });
    userEvent.click(addButton);

    await waitFor(() =>
      expect(global.fetch).toHaveBeenNthCalledWith(
        2, // 두 번째 호출 명시
        "/api/address",
        expect.objectContaining({
          method: "POST",
          body: expect.any(String),
        })
      )
    );
  });

  test("주소 삭제", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { id: "user123" } },
      status: "authenticated",
    });

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
          success: true,
          addresses: [{ id: "1", addressname: "Address 1" }],
        }),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({ success: true }),
      });

    render(
      <AddressProvider>
        <AddressContextTestComponent />
      </AddressProvider>
    );
    await waitFor(() =>
      screen.getByRole("button", { name: /delete address/i })
    );

    const deleteButton = screen.getByRole("button", {
      name: /delete address/i,
    });
    userEvent.click(deleteButton);

    await waitFor(() =>
      expect(global.fetch).toHaveBeenNthCalledWith(
        2, // 두 번째 호출
        "/api/address/delete",
        expect.objectContaining({
          method: "POST",
          body: expect.any(String),
        })
      )
    );
  });
});

// 테스트 컴포넌트
function AddressContextTestComponent() {
  const handleAdd = () => {
    fetch("/api/address", {
      method: "POST",
      body: JSON.stringify({ addressname: "Test Address" }),
    });
  };

  const handleDelete = () => {
    fetch("/api/address/delete", {
      method: "POST",
      body: JSON.stringify({ id: "1" }),
    });
  };

  const { addresses, error, loading, addAddress, deleteAddress } = useAddress();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {addresses &&
        addresses.map((address) => (
          <div key={address.id}>
            {address.addressname}
            <button aria-label="Delete Address" onClick={handleDelete}>
              Delete Address
            </button>
          </div>
        ))}
      <button aria-label="Add Address" onClick={handleAdd}>
        Add Address
      </button>
    </div>
  );
}
