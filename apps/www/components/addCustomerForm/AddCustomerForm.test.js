import { waitFor } from "@testing-library/dom";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import faker from "faker";
import { AddCustomerForm } from "./AddCustomerForm";

const mockAddCustomer = jest.fn((firstName) => {
  return Promise.resolve({ firstName });
});

describe("AddCustomerForm", () => {
  it("should display validation error", async () => {
    await act(async () =>
      render(<AddCustomerForm addCustomer={mockAddCustomer} />)
    );

    userEvent.click(screen.getByRole("button", { name: /Dodaj/i }));

    await waitFor(() => expect(mockAddCustomer).not.toHaveBeenCalled());
  });

  it("should call on submit", async () => {
    await act(async () =>
      render(<AddCustomerForm addCustomer={mockAddCustomer} />)
    );

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const phone = faker.phone.phoneNumber();

    userEvent.type(screen.getByLabelText(/Imię/i), firstName);
    userEvent.type(screen.getByLabelText(/Nazwisko/i), lastName);
    userEvent.type(screen.getByLabelText(/Email/i), email);
    userEvent.type(screen.getByLabelText(/Telefon/i), phone);
    userEvent.click(screen.getByRole("button", { name: /Dodaj/i }));

    await waitFor(() => expect(mockAddCustomer).toHaveBeenCalledTimes(1));
  });
});
