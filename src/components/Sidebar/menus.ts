import { FiCreditCard, FiUsers } from "react-icons/fi";

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
        key: "payments.lol",
        icon: FiUsers,
        label: "Lol",
        url: "/payments/users",
      },
      {
        key: "payments.lol2",
        icon: FiCreditCard,
        label: "Lol2",
        url: "/payments/payments",
      },
    ],
  },
  {
    icon: FiCreditCard,
    label: "Not payments",
    url: "/not-payments",
    key: "not-payments",
    children: [
      {
        key: "not-payments.lol",
        icon: FiUsers,
        label: "Huh?",
        url: "/not-payments/users",
      },
      {
        key: "not-payments.lol2",
        icon: FiCreditCard,
        label: "Lol2",
        url: "/not-payments/payments",
      },
    ],
  },
];

export default menus;
