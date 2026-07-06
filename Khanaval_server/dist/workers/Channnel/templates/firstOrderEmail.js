export const firstOrderEmailTemplate = (userName, profileImage, kitchenImage, kitchenName, items, totalPrice, paymentMode, orderStatus, address, orderId, orderDate) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Your First Order</title>
</head>

<body style="margin:0;padding:0;background:#f8f6f2;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f8f6f2">
<tr>
<td align="center">

<table width="650" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:20px;overflow:hidden;">

<!-- Header -->

<tr>
<td align="center"
style="padding:35px;background:linear-gradient(90deg,#fff,#fff6eb);">

<img
src="https://khanaaval.com/logo.png"
width="170">

</td>
</tr>

<!-- Hero -->

<tr>

<td
style="padding:40px;">

<h1
style="margin:0;font-size:42px;color:#101828;">

Your first meal<br>

<span style="color:#ff6b00;">
with us!
</span>

</h1>

<p
style="font-size:18px;color:#555;line-height:30px;">

Hi <b>${userName}</b>,<br><br>

Thank you for placing your first order on
<b>Khanaaval</b> ❤️

We're excited to serve you delicious,
home-style meals prepared with hygiene and care.

</p>

</td>

</tr>

<!-- User -->

<tr>

<td style="padding:30px;">

<table width="100%">

<tr>

<td width="90">

<img
src="${profileImage}"
width="70"
height="70"
style="border-radius:50%;">

</td>

<td>

<h2
style="margin:0;color:#ff6b00;">
Welcome ${userName} 👋
</h2>

<p style="color:#666;">
Your order has been successfully placed.
</p>

</td>

</tr>

</table>

</td>

</tr>

<!-- Order Summary -->

<tr>

<td style="padding:30px;">

<h2 style="color:#101828;">
Order Summary
</h2>

<table
width="100%"
style="border:1px solid #eee;
border-radius:10px;">

<tr>

<td style="padding:15px;">
Order ID
</td>

<td align="right">
${orderId}
</td>

</tr>

<tr>

<td style="padding:15px;">
Items
</td>

<td align="right">
${items}
</td>

</tr>

<tr>

<td style="padding:15px;">
Payment
</td>

<td align="right">
${paymentMode}
</td>

</tr>

<tr>

<td style="padding:15px;">
Status
</td>

<td align="right">

<span
style="
background:#fff1e5;
padding:6px 14px;
border-radius:20px;
color:#ff6b00;
">

${orderStatus}

</span>

</td>

</tr>

<tr>

<td style="padding:15px;">
Order Date
</td>

<td align="right">
${orderDate}
</td>

</tr>

<tr>

<td
style="padding:18px;
font-size:20px;
font-weight:bold;">

Total

</td>

<td
align="right"
style="color:#ff6b00;
font-size:24px;
font-weight:bold;">

₹${totalPrice}

</td>

</tr>

</table>

</td>

</tr>

<!-- Kitchen -->

<tr>

<td style="padding:30px;">

<h2>Prepared By</h2>

<table width="100%">

<tr>

<td width="160">

<img
src="${kitchenImage}"
width="150"
style="border-radius:12px;">

</td>

<td>

<h3>${kitchenName}</h3>

<p
style="color:#666;">

Freshly prepared with hygiene
and home-style taste.

</p>

</td>

</tr>

</table>

</td>

</tr>

<!-- Address -->

<tr>

<td style="padding:30px;">

<h2>Delivery Address</h2>

<p
style="
background:#fafafa;
padding:18px;
border-radius:10px;
line-height:28px;
">

${address}

</p>

</td>

</tr>

<!-- CTA -->

<tr>

<td align="center"
style="padding:40px;">

<a
href="https://khanaaval.com"

style="
background:#ff6b00;
color:white;
padding:18px 40px;
text-decoration:none;
border-radius:40px;
font-weight:bold;
display:inline-block;
">

Explore More Messes

</a>

</td>

</tr>

<!-- Footer -->

<tr>

<td
align="center"
style="
padding:30px;
background:#fff8f2;
font-size:14px;
color:#777;
">

Thank you for choosing
<b>Khanaaval</b> ❤️

<br><br>

Your Daily Food, Simplified.

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`;
//# sourceMappingURL=firstOrderEmail.js.map