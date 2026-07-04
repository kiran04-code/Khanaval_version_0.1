import { getMyOrder, useCurrentUser } from "@/hooks/user-hook";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Clock3,
  MapPin,
  Package,
  Phone,
  Receipt,
  ShieldCheck,
  Store,
  Wallet,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

type OrderMenuItem = {
  count?: number;
  productId?: {
    _id?: string;
    productName?: string;
    productprice?: number;
    productimage?: string;
    productCategory?: string;
  };
};

type UserOrder = {
  _id: string;
  totalPrice?: number;
  paymentMode?: string;
  OrderStatus?: string;
  AllIteam?: string;
  AddressToDelivedProduct?: string;
  orderPlaceTime?: string;
  createdAt?: string;
  KitchenId?: {
    _id?: string;
    CloudKitchenName?: string;
    CloudKitchenContactNumber?: string;
    CloudKitchenimage?: string;
    CloudKitchenFoodCategory?: string;
    CloudKitchenAdress?: {
      address?: string;
      city?: string;
      state?: string;
      postcode?: string;
      landmark?: string;
    };
  };
  productList?: OrderMenuItem[];
};

const orderStatusTone: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-700 border-amber-100",
  Accepted: "bg-sky-50 text-sky-700 border-sky-100",
  Preparing: "bg-violet-50 text-violet-700 border-violet-100",
  Ready: "bg-indigo-50 text-indigo-700 border-indigo-100",
  OutForDelivery: "bg-cyan-50 text-cyan-700 border-cyan-100",
  Delivered: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Cancelled: "bg-rose-50 text-rose-700 border-rose-100",
};

const formatPrice = (amount?: number) => `Rs. ${Math.round(amount || 0)}`;

const formatDate = (value?: string) => {
  if (!value) return "Recently placed";
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getKitchenAddress = (order: UserOrder) =>
  order.KitchenId?.CloudKitchenAdress?.address ||
  [
    order.KitchenId?.CloudKitchenAdress?.landmark,
    order.KitchenId?.CloudKitchenAdress?.city,
    order.KitchenId?.CloudKitchenAdress?.state,
  ]
    .filter(Boolean)
    .join(", ") ||
  "Kitchen address not available";

const ShowMyAllOrder = () => {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const userId = user?.id || "";
  const { myorders, isLoading } = getMyOrder(userId);

  const orders = Array.isArray(myorders) ? (myorders as UserOrder[]) : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_30%,#f8fafc_100%)]">
        <Navbar />
        <div className="container mx-auto space-y-5 px-4 pb-16 pt-28">
          <Skeleton className="h-28 w-full rounded-[28px]" />
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-[360px] w-full rounded-[30px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_30%,#f8fafc_100%)]">
      <Navbar />

      <section className="container mx-auto px-4 pb-6 pt-24 sm:pt-28">
        <Card className="overflow-hidden rounded-[30px] border border-slate-200/80 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.06)]">
          <CardContent className="p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-orange-600">
                  <Receipt className="h-3.5 w-3.5" />
                  Order History
                </div>
                <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  See all your cloud kitchen orders
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                  Track kitchen details, menu items, delivery address, payment mode, and order status in one clean mobile-friendly page.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/profile")}
                className="rounded-full border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 hover:bg-slate-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to profile
              </Button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[22px] border border-orange-100 bg-orange-50/80 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-orange-500">
                  Total Orders
                </p>
                <p className="mt-2 text-3xl font-black text-slate-950">{orders.length}</p>
              </div>
              <div className="rounded-[22px] border border-emerald-100 bg-emerald-50/80 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-600">
                  Delivered
                </p>
                <p className="mt-2 text-3xl font-black text-slate-950">
                  {orders.filter((order) => order.OrderStatus === "Delivered").length}
                </p>
              </div>
              <div className="rounded-[22px] border border-slate-200 bg-slate-50/80 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                  Pending
                </p>
                <p className="mt-2 text-3xl font-black text-slate-950">
                  {orders.filter((order) => order.OrderStatus === "Pending").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="container mx-auto px-4 pb-16">
        {orders.length === 0 ? (
          <Card className="rounded-[30px] border border-dashed border-slate-300 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
            <CardContent className="flex flex-col items-center px-6 py-16 text-center">
              <Package className="h-12 w-12 text-orange-500" />
              <h2 className="mt-5 text-2xl font-black text-slate-950">No orders yet</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                Start ordering from cloud kitchens and your full order details will show here.
              </p>
              <Link to="/getCloudeMess">
                <Button className="mt-6 rounded-2xl bg-slate-950 px-6 font-bold text-white hover:bg-orange-500">
                  Explore cloud kitchens
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-5">
            {orders
              .slice()
              .reverse()
              .map((order) => (
                <Card
                  key={order._id}
                  className="overflow-hidden rounded-[30px] border border-slate-200/80 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
                >
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[1.05fr,0.95fr]">
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <img
                            src={order.KitchenId?.CloudKitchenimage || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"}
                            alt={order.KitchenId?.CloudKitchenName || "Cloud Kitchen"}
                            className="h-24 w-24 rounded-[22px] object-cover shadow-sm sm:h-28 sm:w-28"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge
                                className={`border ${orderStatusTone[order.OrderStatus || "Pending"] || "bg-slate-100 text-slate-700 border-slate-200"} hover:bg-inherit`}
                              >
                                {order.OrderStatus || "Pending"}
                              </Badge>
                              <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">
                                {order.paymentMode || "Cash"}
                              </Badge>
                            </div>
                            <h2 className="mt-3 line-clamp-2 text-xl font-black text-slate-950 sm:text-2xl">
                              {order.KitchenId?.CloudKitchenName || "Cloud Kitchen"}
                            </h2>
                            <p className="mt-1 text-sm font-medium text-orange-600">
                              {order.KitchenId?.CloudKitchenFoodCategory || "Fresh kitchen meals"}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-slate-500">
                              Order ID: <span className="font-semibold text-slate-700">{order._id}</span>
                            </p>
                          </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-[22px] bg-slate-50 p-4">
                            <div className="flex items-start gap-3">
                              <Clock3 className="mt-0.5 h-5 w-5 text-orange-500" />
                              <div>
                                <p className="text-sm font-bold text-slate-950">Placed on</p>
                                <p className="mt-1 text-sm leading-6 text-slate-600">
                                  {formatDate(order.orderPlaceTime || order.createdAt)}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="rounded-[22px] bg-slate-50 p-4">
                            <div className="flex items-start gap-3">
                              <Wallet className="mt-0.5 h-5 w-5 text-orange-500" />
                              <div>
                                <p className="text-sm font-bold text-slate-950">Bill amount</p>
                                <p className="mt-1 text-lg font-black text-slate-950">
                                  {formatPrice(order.totalPrice)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4">
                          <div className="flex items-start gap-3">
                            <MapPin className="mt-0.5 h-5 w-5 text-orange-500" />
                            <div>
                              <p className="text-sm font-bold text-slate-950">Delivery address</p>
                              <p className="mt-1 text-sm leading-6 text-slate-600">
                                {order.AddressToDelivedProduct || "Address not available"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-[24px] border border-slate-200 bg-white p-4">
                          <div className="flex items-start gap-3">
                            <Store className="mt-0.5 h-5 w-5 text-orange-500" />
                            <div>
                              <p className="text-sm font-bold text-slate-950">Kitchen details</p>
                              <p className="mt-1 text-sm leading-6 text-slate-600">
                                {getKitchenAddress(order)}
                              </p>
                              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <Phone className="h-4 w-4 text-slate-400" />
                                {order.KitchenId?.CloudKitchenContactNumber || "Contact not available"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="rounded-[24px] border border-slate-200 bg-white p-4">
                          <div className="flex items-center justify-between gap-3">
                            <h3 className="text-lg font-black text-slate-950">Ordered items</h3>
                            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                              {order.productList?.length || 0} items
                            </Badge>
                          </div>

                          <div className="mt-4 space-y-3">
                            {(order.productList || []).map((product, index) => (
                              <div
                                key={`${product.productId?._id || index}-${index}`}
                                className="flex items-center gap-3 rounded-[20px] bg-slate-50 p-3"
                              >
                                <img
                                  src={product.productId?.productimage || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"}
                                  alt={product.productId?.productName || "Order item"}
                                  className="h-16 w-16 rounded-2xl object-cover"
                                />
                                <div className="min-w-0 flex-1">
                                  <p className="line-clamp-1 text-sm font-black text-slate-950">
                                    {product.productId?.productName || "Menu item"}
                                  </p>
                                  <p className="mt-1 text-xs text-slate-500">
                                    {product.productId?.productCategory || "Main Course"}
                                  </p>
                                  <div className="mt-2 flex items-center justify-between gap-3">
                                    <span className="text-xs font-semibold text-slate-600">
                                      Qty {product.count || 0}
                                    </span>
                                    <span className="text-sm font-black text-slate-950">
                                      {formatPrice(
                                        Number(product.productId?.productprice || 0) * Number(product.count || 0),
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-[24px] border border-orange-100 bg-[linear-gradient(135deg,#fff7ed_0%,#ffffff_100%)] p-4">
                          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange-500">
                            Order summary
                          </p>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {order.AllIteam || "Order items summary not available"}
                          </p>
                          <div className="mt-4 flex items-center justify-between border-t border-orange-100 pt-4">
                            <span className="text-base font-black text-slate-950">Total paid</span>
                            <span className="text-xl font-black text-slate-950">
                              {formatPrice(order.totalPrice)}
                            </span>
                          </div>
                        </div>

                        {order.OrderStatus === "Delivered" && (
                          <div className="rounded-[22px] border border-emerald-100 bg-emerald-50/80 p-4">
                            <div className="flex items-start gap-3">
                              <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-600" />
                              <div>
                                <p className="text-sm font-black text-emerald-700">
                                  Delivered successfully
                                </p>
                                <p className="mt-1 text-sm leading-6 text-emerald-700/80">
                                  Your meal reached you and this order is completed.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default ShowMyAllOrder;
