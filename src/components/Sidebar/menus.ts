import { FiCreditCard, FiUser, FiUsers } from "react-icons/fi";

// TODO: Use component based method like chakra-ui, not object based
const menus = [
  {
    key: "clients",
    icon: FiUsers,
    label: "Clients",
    url: "/clients",
    children: [
      { icon: FiUsers, label: "Users", url: "/clients/users" },
      {
        icon: FiCreditCard,
        key: "clients.payments",
        label: "Payment",
        url: "/clients/payments",
        children: [
          {
            key: "clients.payments.lol",
            icon: FiUsers,
            label: "Lol",
            url: "/clients/payments/yes",
          },
          {
            key: "clients.payments.lol2",
            icon: FiCreditCard,
            label: "Lol2",
            url: "/clients/payments/not",
          },
        ],
      },
    ],
  },
  {
    icon: FiCreditCard,
    label: "Payments",
    key: "payments",
    url: "/payments",
    children: [
      {
        key: "payments.internal",
        icon: FiUsers,
        label: "Internal",
        url: "/payments/internal",
      },
    ],
  },
];

export default menus;
