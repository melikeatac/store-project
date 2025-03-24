'use client'

import { Trash2Icon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DarkMode, LightMode } from '@mui/icons-material';
import { handleTheme } from '../features/productSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  firstName: yup.string().required("İsim alanı zorunlu"),
  lastName: yup.string().required("Soyisim alanı zorlu"),
  address: yup.string().required("Adres alanı zorunlu"),
  phone: yup
    .string()
    .matches(/^\d+$/, "Telefon numarası sadece sayısal olmalı")
    .required("Telefon alanı zorunlu"),
  email: yup.string().email("Geçersiz email").required("Email alanı zorunlu"),
  cardNumber: yup
    .string()
    .matches(/^\d{16}$/, "Kart numarası 16 haneli olmalı")
    .required("Kart numarası alanı zorunlu"),
  nameOnCard: yup.string().required("Kart ismi alanı zorunlu"),
});

export const Bill = () => {
  const { basketList, open } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const theme = useSelector(state => state.products.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  let subTotal = 0;
  for (let index = 0; index < basketList.length; index++) {
    subTotal += basketList[index].price * basketList[index].count;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const approveToast = () => {
    toast.success("Siparişiniz Başarıyla Oluşturuldu!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const formSubmit = (form) => {
    approveToast();
    console.log("Data:", form);
  };


  return (
    <div className="bg-gray-50 dark:bg-gray-900 sm:h-screen">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-4 sm:pt-16 sm:px-6 lg:max-w-7xl lg:px-8">

        <form onSubmit={handleSubmit(formSubmit)} className="lg:grid flex flex-col-reverse lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div>
            <h2 className="text-lg font-medium dark:text-white text-gray-900 sm:mt-0 mt-6">Sipariş Bilgileri</h2>

            <div className="mt-6 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label className="block text-sm font-medium dark:text-white text-gray-700">İsim</label>
                <input
                  {...register("firstName")}
                  className="block w-full rounded-md border px-3 py-2"
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium dark:text-white text-gray-700">Soyisim</label>
                <input
                  {...register("lastName")}
                  className="block w-full rounded-md border px-3 py-2"
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium dark:text-white text-gray-700">Adres</label>
                <textarea
                  {...register("address")}
                  className="block w-full rounded-md border px-3 py-2 resize-none"
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium dark:text-white text-gray-700">Telefon</label>
                <input
                  {...register("phone")}
                  className="block w-full rounded-md border px-3 py-2"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium dark:text-white text-gray-700">Email</label>
                <input
                  {...register("email")}
                  className="block w-full rounded-md border px-3 py-2"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium dark:text-white text-gray-700">Kart Numarası</label>
                <input
                  {...register("cardNumber")}
                  className="block w-full rounded-md border px-3 py-2"
                />
                {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium dark:text-white text-gray-700">Kart Üzerindeki İsim</label>
                <input
                  {...register("nameOnCard")}
                  className="block w-full rounded-md border px-3 py-2"
                />
                {errors.nameOnCard && <p className="text-red-500 text-sm">{errors.nameOnCard.message}</p>}
              </div>


            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
              >
                Sipariş Oluştur
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium dark:text-white text-gray-900 pt-6 sm:pt-0">Sipariş Özeti</h2>

            <div className="mt-6 rounded-lg border border-gray-200 bg-white shadow-sm">
              <ul className="divide-y divide-gray-200 max-h-[400px] overflow-hidden overflow-y-auto">
                {basketList.map((product) => (
                  <li key={product.id} className="flex px-4 py-6 sm:px-6">
                    <div className="shrink-0">
                      <img alt={product.title} src={product.image} className="w-20 rounded-md" />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
                              {product.title}
                            </a>
                          </h4>
                        </div>

                        <div className="ml-4 flow-root shrink-0">
                          <button
                            type="button"
                            className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                          >
                            <Trash2Icon aria-hidden="true" className="size-5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">{product.price} TL</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Toplam ürün fiyatı</dt>
                  <dd className="text-sm font-medium text-gray-900">{subTotal} TL</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Kargo ücreti</dt>
                  <dd className="text-sm font-medium text-gray-900">40 TL</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Toplam</dt>
                  <dd className="text-base font-medium text-gray-900">{subTotal + 40} TL</dd>
                </div>
              </dl>
            </div>
          </div>
          <button
            className={`cursor-pointer fixed left-4 bottom-12 text-center p-3 sm:p-4 flex rounded-full bg-gray-700 text-white dark:bg-yellow-500`}
            onClick={() => dispatch(handleTheme())}
          >
            {theme === "dark" ? <LightMode /> : <DarkMode />}
          </button>
        </form>
      </div>
    </div>
  )
}
