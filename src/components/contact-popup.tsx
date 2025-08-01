"use client";

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBudget: number | null;
}

export function ContactPopup({
  isOpen,
  onClose,
  selectedBudget,
}: ContactPopupProps) {
  const contacts = [
    {
      name: "Rahul Sharma",
      position: "Sales Manager",
      phone: "+91 98765 43210",
      email: "rahul@silverproducts.com",
    },
    {
      name: "Priya Patel",
      position: "Customer Support",
      phone: "+91 87654 32109",
      email: "priya@silverproducts.com",
    },
  ];

  const formatBudget = (budget: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(budget);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl border">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-blue-900">
            Get Your Quote
          </h2>
          <p className="text-blue-600 mt-2">
            Contact us to get exact quote and product details for your budget of{" "}
            <span className="font-semibold text-blue-700">
              {selectedBudget ? formatBudget(selectedBudget) : ""}
            </span>
          </p>
        </div>

        <div className="space-y-4 mt-6">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="border-2 border-blue-200 bg-blue-50 p-6 rounded-lg"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900">
                    {contact.name}
                  </h3>
                  <p className="text-blue-600 text-sm">{contact.position}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-mono font-semibold text-blue-900">
                    {contact.phone}
                  </span>
                  <Button
                    onClick={() => window.open(`tel:${contact.phone}`)}
                    className="bg-blue-600 hover:bg-blue-700"
                    size="sm"
                  >
                    Call
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-mono font-semibold text-blue-900">
                    {contact.email}
                  </span>
                  <Button
                    onClick={() => window.open(`mailto:${contact.email}`)}
                    className="bg-blue-600 hover:bg-blue-700"
                    size="sm"
                  >
                    Email
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-mono font-semibold text-blue-900">
                    WhatsApp
                  </span>
                  <Button
                    onClick={() =>
                      window.open(
                        `https://wa.me/${contact.phone.replace(/\D/g, "")}`
                      )
                    }
                    className="bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    Chat
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-600 text-center">
              <strong>Business Hours:</strong> Monday - Saturday, 9:00 AM - 7:00
              PM
            </p>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
