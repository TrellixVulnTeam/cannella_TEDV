import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

enum GenderEnum {
  female = "kobieta",
  male = "męzczyzna",
}

enum SourcesCustomerAcquistion {
  facebook = "facebook",
  instagram = "instagram",
  google = "reklama google",
  recommendedByAntoherCustomer = "polecony przez innego klienta",
}

export interface AddCustomerFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: GenderEnum;
  birthday: Date;
  sourceCustomerAcquistion: SourcesCustomerAcquistion;
  dataProcessingConsent: boolean;
}

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email(),
    phone: yup.string().required(),
    gender: yup.string().required(),
    birthday: yup.date(),
    sourceCustomerAcquistion: yup.string(),
    dataProcessingConsent: yup.boolean(),
  })
  .required();

interface AddCustomerFormProps {
  addCustomer: (data: AddCustomerFormInputs) => Promise<void>;
}

export function AddCustomerForm({ addCustomer }: AddCustomerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AddCustomerFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: AddCustomerFormInputs) => {
    console.log(data);
    await addCustomer(data);
  };

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="py-4">
        <label
          htmlFor="firstName"
          className="text-gray-700 text-sm font-bold mb-2"
        >
          Imię
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="firstName"
          {...register("firstName", { required: true })}
        />
        {errors.firstName && errors.firstName.type === "required" && (
          <span className="text-red-500">Pole jest wymagane</span>
        )}
      </div>
      <div className="py-4">
        <label
          htmlFor="lastName"
          className="text-gray-700 text-sm font-bold mb-2"
        >
          Nazwisko
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="lastName"
          {...register("lastName", { required: true })}
        />
        {errors.lastName && errors.lastName.type === "required" && (
          <span className="text-red-500">Pole jest wymagane</span>
        )}
      </div>

      <div className="py-4">
        <label htmlFor="email" className="text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          {...register("email", {
            pattern: {
              value: /\S+@\S+\.\S+/,
            },
          })}
        />
        {errors.email && errors.email.type === "email" && (
          <span className="text-red-500">Niepoprzwny format adresu email.</span>
        )}
      </div>

      <div className="py-4">
        <label htmlFor="phone" className="text-gray-700 text-sm font-bold mb-2">
          Telefon
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="phone"
          {...register("phone", { required: true })}
        />
        {errors.phone && errors.phone.type === "required" && (
          <span className="text-red-500">Pole jest wymagane</span>
        )}
      </div>

      <div className="py-4">
        <label
          htmlFor="birthday"
          className="text-gray-700 text-sm font-bold mb-2"
        >
          Data urodzenia
        </label>
        <Controller
          name="birthday"
          control={control}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(e) => field.onChange(e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          )}
        />
      </div>

      <div className="py-4 flex flex-col">
        <label
          htmlFor="gender"
          className="text-gray-700 text-sm font-bold mb-2"
        >
          Płeć
        </label>
        <select
          {...register("gender")}
          id="gender"
          className="shadow appearance-none border rounded max-w-xs py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="female">Kobieta</option>
          <option value="male">Męzczyzna</option>
        </select>
      </div>

      <div className="py-4 flex flex-col">
        <label
          htmlFor="sourceCustomerAcquistion"
          className="text-gray-700 text-sm font-bold mb-2"
        >
          Źródło pozyskania klienta
        </label>
        <select
          {...register("sourceCustomerAcquistion")}
          id="sourceCustomerAcquistion"
          className="shadow appearance-none border rounded max-w-xs py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value=""></option>
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="google">reklama google</option>
          <option value="recommendedByAntoherCustomer">
            polecony przez innego klienta
          </option>
        </select>
      </div>

      <div className="py-4">
        <label
          htmlFor="dataProcessingConsent"
          className="text-gray-700 text-sm font-bold mb-2"
        >
          Zgody na przetwarzanie danych
        </label>
        <input
          type="checkbox"
          id="dataProcessingConsent"
          className="ml-4"
          {...register("dataProcessingConsent")}
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Dodaj
      </button>
    </form>
  );
}
