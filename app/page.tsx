"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

import {
  ShoppingCart,
  CreditCard,
  UtensilsCrossed,
  Search,
  Clock3,
  Bell,
  Star,
  ChefHat,
  Receipt,
  TrendingUp,
  Users,
  Moon,
  Sun,
} from "lucide-react";

import toast, { Toaster } from "react-hot-toast";

import { motion } from "framer-motion";

import { QRCodeCanvas } from "qrcode.react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useCartStore } from "@/store/useCartStore";

const products = [
  {
    id: "1",
    name: "Pizza",
    category: "Pizza",
    size: "Medium",
    basePrice: 299,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: "2",
    name: "Burger",
    category: "Fast Food",
    size: "Regular",
    basePrice: 120,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: "3",
    name: "Noodles",
    category: "Chinese",
    size: "Full",
    basePrice: 150,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: "4",
    name: "Cold Coffee",
    category: "Drinks",
    size: "Large",
    basePrice: 180,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1200&auto=format&fit=crop",
  },
];

const categories = [
  "All",
  "Pizza",
  "Fast Food",
  "Chinese",
  "Drinks",
];

const salesData = [
  {
    day: "Mon",
    sales: 4000,
  },

  {
    day: "Tue",
    sales: 5000,
  },

  {
    day: "Wed",
    sales: 6200,
  },

  {
    day: "Thu",
    sales: 7000,
  },

  {
    day: "Fri",
    sales: 8500,
  },

  {
    day: "Sat",
    sales: 9500,
  },

  {
    day: "Sun",
    sales: 12000,
  },
];

export default function Home() {

  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();

  const [search, setSearch] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [paymentMethod, setPaymentMethod] =
    useState("Cash");

  const [discount, setDiscount] =
    useState(0);

  const [coupon, setCoupon] =
    useState("");

  const [time, setTime] =
    useState("");

  const [theme, setTheme] =
    useState("dark");

  const [customerName, setCustomerName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [deliveryAddress, setDeliveryAddress] =
    useState("");

  useEffect(() => {

    const interval = setInterval(() => {

      setTime(
        new Date().toLocaleTimeString()
      );

    }, 1000);

    return () =>
      clearInterval(interval);

  }, []);

  const filteredProducts = products.filter(
    (item) => {

      const categoryMatch =
        selectedCategory === "All" ||
        item.category === selectedCategory;

      const searchMatch =
        item.name
          .toLowerCase()
          .includes(search.toLowerCase());

      return (
        categoryMatch &&
        searchMatch
      );
    }
  );

  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      item.basePrice * item.quantity,
    0
  );

  const gst = subtotal * 0.05;

  const total =
    subtotal + gst - discount;

  const handleAddToCart = (item: any) => {

    addToCart({
      ...item,
      quantity: 1,
    });

    toast.success(
      `${item.name} Added`
    );

  };

  const applyCoupon = () => {

    if (coupon === "FOOD50") {

      setDiscount(50);

      toast.success(
        "Coupon Applied"
      );

    } else {

      toast.error(
        "Invalid Coupon"
      );

    }
  };

  const generateBill = () => {

    if (cart.length === 0) {

      toast.error(
        "Cart is Empty"
      );

      return;
    }

    const items = cart
      .map(
        (item) =>
          `${item.name} x${item.quantity}
₹${item.basePrice * item.quantity}`
      )
      .join("\n");

    const bill = `
========================
     RESTAURANT POS
========================

Customer : ${customerName}

Phone : ${phone}

Payment : ${paymentMethod}

------------------------

${items}

------------------------

Subtotal : ₹${subtotal.toFixed(2)}

GST : ₹${gst.toFixed(2)}

Discount : ₹${discount}

TOTAL : ₹${total.toFixed(2)}

========================
THANK YOU VISIT AGAIN
========================
`;

    alert(bill);

    toast.success(
      "Bill Generated"
    );

    clearCart();

  };

  return (

    <div
      className={`min-h-screen p-6 transition ${
        theme === "dark"
          ? "bg-gradient-to-br from-black via-zinc-950 to-zinc-900 text-white"
          : "bg-zinc-100 text-black"
      }`}
    >

      <Toaster />

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-6xl font-black text-transparent">
            Restaurant POS
          </h1>

          <p className="mt-2 text-zinc-400">
            Premium Smart Billing System
          </p>

          <div className="mt-3 flex items-center gap-2">

            <Clock3 size={18} />

            {time}

          </div>

        </div>

        <div className="flex items-center gap-4">

          <button
            onClick={() =>
              setTheme(
                theme === "dark"
                  ? "light"
                  : "dark"
              )
            }
            className="rounded-2xl bg-zinc-800 p-4"
          >

            {theme === "dark" ? (
              <Sun />
            ) : (
              <Moon />
            )}

          </button>

          <button className="relative rounded-2xl bg-zinc-800 p-4">

            <Bell />

            <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 py-1 text-xs">
              3
            </span>

          </button>

        </div>

      </div>

      {/* Dashboard */}

      <div className="mb-6 grid grid-cols-4 gap-4">

        <div className="rounded-3xl bg-zinc-900 p-5">

          <p className="text-zinc-400">
            Today's Sales
          </p>

          <h2 className="mt-2 text-3xl font-black text-green-400">
            ₹12,450
          </h2>

        </div>

        <div className="rounded-3xl bg-zinc-900 p-5">

          <p className="text-zinc-400">
            Orders
          </p>

          <h2 className="mt-2 text-3xl font-black text-orange-400">
            42
          </h2>

        </div>

        <div className="rounded-3xl bg-zinc-900 p-5">

          <p className="text-zinc-400">
            Customers
          </p>

          <h2 className="mt-2 text-3xl font-black text-pink-400">
            65
          </h2>

        </div>

        <div className="rounded-3xl bg-zinc-900 p-5">

          <p className="text-zinc-400">
            Growth
          </p>

          <h2 className="mt-2 flex items-center gap-2 text-3xl font-black text-blue-400">

            <TrendingUp />

            18%

          </h2>

        </div>

      </div>

      {/* Loyalty */}

      <div className="mb-6 rounded-3xl bg-gradient-to-r from-orange-500 to-yellow-400 p-6 text-black">

        <h2 className="text-3xl font-black">
          Loyalty Program
        </h2>

        <p className="mt-2 text-lg">
          Customer Points: 120
        </p>

        <button className="mt-4 rounded-2xl bg-black px-5 py-3 font-bold text-white">
          Redeem Rewards
        </button>

      </div>

      {/* Main */}

      <div className="grid grid-cols-4 gap-6">

        {/* Products */}

        <div className="col-span-2 rounded-3xl bg-zinc-900 p-6">

          {/* Search */}

          <div className="relative mb-6">

            <Search className="absolute left-4 top-4 text-zinc-500" />

            <input
              type="text"
              placeholder="Search Food..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-2xl bg-zinc-800 py-4 pl-14 pr-4 outline-none"
            />

          </div>

          {/* Categories */}

          <div className="mb-6 flex gap-3">

            {categories.map((category) => (

              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={`rounded-full px-5 py-2 font-bold ${
                  selectedCategory === category
                    ? "bg-orange-500"
                    : "bg-zinc-800"
                }`}
              >

                {category}

              </button>

            ))}

          </div>

          {/* Products */}

          <div className="grid grid-cols-2 gap-5">

            {filteredProducts.map((item) => (

              <motion.div
                key={item.id}
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="overflow-hidden rounded-3xl bg-zinc-800"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">

                  <div className="flex justify-between">

                    <div>

                      <h2 className="text-2xl font-bold">
                        {item.name}
                      </h2>

                      <p className="text-zinc-400">
                        {item.size}
                      </p>

                    </div>

                    <p className="text-xl font-bold text-orange-400">
                      ₹{item.basePrice}
                    </p>

                  </div>

                  <div className="mt-2 flex items-center gap-2 text-yellow-400">

                    <Star
                      size={16}
                      fill="yellow"
                    />

                    {item.rating}

                  </div>

                  <button
                    onClick={() =>
                      handleAddToCart(item)
                    }
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-3 font-bold"
                  >

                    <ShoppingCart size={18} />

                    Add To Cart

                  </button>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

        {/* Billing */}

        <div className="rounded-3xl bg-zinc-900 p-6">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="flex items-center gap-2 text-3xl font-black">

              <UtensilsCrossed />

              Billing

            </h2>

            <div className="rounded-xl bg-orange-500 px-4 py-2 font-bold text-black">
              #1024
            </div>

          </div>

          {/* Customer */}

          <div className="space-y-3">

            <input
              type="text"
              value={customerName}
              onChange={(e) =>
                setCustomerName(
                  e.target.value
                )
              }
              placeholder="Customer Name"
              className="w-full rounded-2xl bg-zinc-800 p-4 outline-none"
            />

            <input
              type="text"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
              placeholder="Phone Number"
              className="w-full rounded-2xl bg-zinc-800 p-4 outline-none"
            />

            <textarea
              value={deliveryAddress}
              onChange={(e) =>
                setDeliveryAddress(
                  e.target.value
                )
              }
              placeholder="Delivery Address"
              className="w-full rounded-2xl bg-zinc-800 p-4 outline-none"
            />

          </div>

          {/* Cart */}

          <div className="mt-5 space-y-4">

            {cart.length === 0 && (

              <div className="rounded-2xl bg-zinc-800 p-6 text-center text-zinc-400">
                No Items Added
              </div>

            )}

            {cart.map((item) => (

              <div
                key={item.id}
                className="rounded-2xl bg-zinc-800 p-4"
              >

                <div className="flex justify-between">

                  <div>

                    <h3 className="font-bold">
                      {item.name}
                    </h3>

                    <p className="text-sm text-zinc-400">
                      {item.size}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-bold text-orange-400">
                      ₹
                      {item.basePrice *
                        item.quantity}
                    </p>

                    <div className="mt-2 flex items-center gap-2">

                      <button
                        onClick={() =>
                          decreaseQuantity(
                            item.id
                          )
                        }
                        className="rounded-lg bg-zinc-700 px-3 py-1"
                      >
                        -
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.id
                          )
                        }
                        className="rounded-lg bg-green-500 px-3 py-1 text-black"
                      >
                        +
                      </button>

                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(
                          item.id
                        )
                      }
                      className="mt-3 rounded-xl bg-red-500 px-3 py-1 text-sm"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* Coupon */}

          <div className="mt-5">

            <input
              type="text"
              value={coupon}
              onChange={(e) =>
                setCoupon(
                  e.target.value
                )
              }
              placeholder="Enter Coupon"
              className="w-full rounded-2xl bg-zinc-800 p-4 outline-none"
            />

            <button
              onClick={applyCoupon}
              className="mt-3 w-full rounded-2xl bg-green-500 py-3 font-bold text-black"
            >
              Apply Coupon
            </button>

          </div>

          {/* Notes */}

          <textarea
            value={notes}
            onChange={(e) =>
              setNotes(
                e.target.value
              )
            }
            placeholder="Special Instructions..."
            className="mt-5 w-full rounded-2xl bg-zinc-800 p-4 outline-none"
          />

          {/* Totals */}

          <div className="mt-6 border-t border-zinc-700 pt-6">

            <div className="mb-3 flex justify-between">
              <span>Subtotal</span>
              <span>
                ₹{subtotal.toFixed(2)}
              </span>
            </div>

            <div className="mb-3 flex justify-between">
              <span>GST</span>
              <span>
                ₹{gst.toFixed(2)}
              </span>
            </div>

            <div className="mb-3 flex justify-between">
              <span>Discount</span>
              <span>
                ₹{discount}
              </span>
            </div>

            <div className="mb-6 flex justify-between text-3xl font-black">

              <span>Total</span>

              <span className="text-orange-400">
                ₹{total.toFixed(2)}
              </span>

            </div>

            {/* Payments */}

            <div className="grid grid-cols-3 gap-3">

              <button
                onClick={() =>
                  setPaymentMethod(
                    "Cash"
                  )
                }
                className={`rounded-2xl py-3 font-bold ${
                  paymentMethod === "Cash"
                    ? "bg-green-500 text-black"
                    : "bg-zinc-800"
                }`}
              >
                Cash
              </button>

              <button
                onClick={() =>
                  setPaymentMethod(
                    "UPI"
                  )
                }
                className={`rounded-2xl py-3 font-bold ${
                  paymentMethod === "UPI"
                    ? "bg-purple-500"
                    : "bg-zinc-800"
                }`}
              >
                UPI
              </button>

              <button
                onClick={() =>
                  setPaymentMethod(
                    "Card"
                  )
                }
                className={`rounded-2xl py-3 font-bold ${
                  paymentMethod === "Card"
                    ? "bg-blue-500"
                    : "bg-zinc-800"
                }`}
              >
                Card
              </button>

            </div>

            {/* Generate */}

            <button
              onClick={generateBill}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-4 font-black"
            >

              <CreditCard />

              Generate Bill

            </button>

            {/* QR */}

            <div className="mt-6 flex flex-col items-center rounded-3xl bg-zinc-800 p-5">

              <p className="mb-4 font-bold">
                Scan To Pay
              </p>

              <QRCodeCanvas value="upi://pay" />

            </div>

          </div>

        </div>

        {/* Right Sidebar */}

        <div className="space-y-6">

          {/* Kitchen */}

          <div className="rounded-3xl bg-zinc-900 p-6">

            <h2 className="mb-5 flex items-center gap-2 text-2xl font-black">

              <ChefHat />

              Kitchen Orders

            </h2>

            <div className="space-y-3">

              <div className="rounded-2xl bg-zinc-800 p-4">
                Order #1021 - Preparing
              </div>

              <div className="rounded-2xl bg-zinc-800 p-4">
                Order #1022 - Ready
              </div>

            </div>

          </div>

          {/* Sales */}

          <div className="rounded-3xl bg-zinc-900 p-6">

            <h2 className="mb-5 flex items-center gap-2 text-2xl font-black">

              <TrendingUp />

              Weekly Sales

            </h2>

            <ResponsiveContainer
              width="100%"
              height={250}
            >

              <LineChart data={salesData}>

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#f97316"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

          {/* Staff */}

          <div className="rounded-3xl bg-zinc-900 p-6">

            <h2 className="mb-4 flex items-center gap-2 text-2xl font-black">

              <Users />

              Staff Online

            </h2>

            <div className="space-y-3">

              <div className="rounded-2xl bg-zinc-800 p-4">
                Rahul - Cashier
              </div>

              <div className="rounded-2xl bg-zinc-800 p-4">
                Amit - Chef
              </div>

              <div className="rounded-2xl bg-zinc-800 p-4">
                Priya - Waiter
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Floating Buttons */}

      <div className="fixed bottom-6 right-6 flex flex-col gap-4">

        <button className="rounded-full bg-orange-500 p-5 text-2xl shadow-2xl">
          🍔
        </button>

        <button className="rounded-full bg-green-500 p-5 text-2xl shadow-2xl text-black">
          📞
        </button>

        

      </div>

    </div>

  );
}