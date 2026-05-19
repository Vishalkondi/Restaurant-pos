"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

interface Order {

  id: number;

  customer_name: string;

  phone: string;

  payment_method: string;

  total: number;

  created_at: string;
}

export default function AdminPage() {

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    const { data, error } =
      await supabase
        .from("orders")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    if (!error && data) {

      setOrders(data);

    }

    setLoading(false);

  };

  const totalSales =
    orders.reduce(
      (sum, order) =>
        sum + Number(order.total),
      0
    );

  return (

    <div className="min-h-screen bg-black p-10 text-white">

      <h1 className="mb-8 text-5xl font-black text-orange-500">
        Admin Dashboard
      </h1>

      {/* Stats */}

      <div className="mb-10 grid grid-cols-4 gap-5">

        <div className="rounded-3xl bg-zinc-900 p-6">

          <p className="text-zinc-400">
            Total Sales
          </p>

          <h2 className="mt-3 text-4xl font-black text-green-400">
            ₹{totalSales}
          </h2>

        </div>

        <div className="rounded-3xl bg-zinc-900 p-6">

          <p className="text-zinc-400">
            Orders
          </p>

          <h2 className="mt-3 text-4xl font-black text-orange-400">
            {orders.length}
          </h2>

        </div>

        <div className="rounded-3xl bg-zinc-900 p-6">

          <p className="text-zinc-400">
            Customers
          </p>

          <h2 className="mt-3 text-4xl font-black text-pink-400">
            {orders.length}
          </h2>

        </div>

        <div className="rounded-3xl bg-zinc-900 p-6">

          <p className="text-zinc-400">
            Status
          </p>

          <h2 className="mt-3 text-4xl font-black text-blue-400">
            Active
          </h2>

        </div>

      </div>

      {/* Orders Table */}

      <div className="rounded-3xl bg-zinc-900 p-6">

        <h2 className="mb-6 text-3xl font-black">
          Recent Orders
        </h2>

        {loading ? (

          <p>Loading...</p>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-zinc-700 text-left">

                  <th className="pb-4">
                    Customer
                  </th>

                  <th className="pb-4">
                    Phone
                  </th>

                  <th className="pb-4">
                    Payment
                  </th>

                  <th className="pb-4">
                    Total
                  </th>

                  <th className="pb-4">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {orders.map((order) => (

                  <tr
                    key={order.id}
                    className="border-b border-zinc-800"
                  >

                    <td className="py-4">
                      {
                        order.customer_name
                      }
                    </td>

                    <td className="py-4">
                      {order.phone}
                    </td>

                    <td className="py-4">
                      {
                        order.payment_method
                      }
                    </td>

                    <td className="py-4 text-green-400">
                      ₹{order.total}
                    </td>

                    <td className="py-4">
                      {new Date(
                        order.created_at
                      ).toLocaleString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );
}