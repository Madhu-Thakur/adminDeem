import { Search } from "lucide-react";

import { customers } from "../../data/paymentData";
import {
  transactionTypeFilterOptions,
  serviceTypeFilterOptions,
  statusFilterOptions,
} from "../../data/paymentListData";

const fieldClass = `
  h-11
  px-4
  rounded-xl
  border
  border-gray-200
  dark:border-gray-700
  bg-white
  dark:bg-[#0b0f14]
  text-sm
  text-gray-700
  dark:text-gray-200
  outline-none
  focus:border-deem-red
  focus:ring-2
  focus:ring-red-100
  dark:focus:ring-red-950/30
  transition
`;

const labelClass =
  "block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2";

const PaymentFilters = ({
  search,
  onSearch,
  customer,
  onCustomer,
  transactionType,
  onTransactionType,
  serviceType,
  onServiceType,
  status,
  onStatus,
  fromDate,
  onFromDate,
  toDate,
  onToDate,
}) => {
  return (
    <div className="p-5 flex flex-col gap-4 border-b border-gray-100 dark:border-gray-700">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search payments..."
          className={`${fieldClass} w-full pl-11 cursor-text`}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Customer</label>
          <select
            value={customer}
            onChange={(e) => onCustomer(e.target.value)}
            className={`${fieldClass} w-full cursor-pointer`}
          >
            <option value="all">All Customers</option>
            {customers.map((customerOption) => (
              <option key={customerOption.id} value={customerOption.name}>
                {customerOption.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Transaction Type</label>
          <select
            value={transactionType}
            onChange={(e) => onTransactionType(e.target.value)}
            className={`${fieldClass} w-full cursor-pointer`}
          >
            <option value="all">All Types</option>
            {transactionTypeFilterOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Service Type</label>
          <select
            value={serviceType}
            onChange={(e) => onServiceType(e.target.value)}
            className={`${fieldClass} w-full cursor-pointer`}
          >
            <option value="all">All Services</option>
            {serviceTypeFilterOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Status</label>
          <select
            value={status}
            onChange={(e) => onStatus(e.target.value)}
            className={`${fieldClass} w-full cursor-pointer`}
          >
            <option value="all">All Status</option>
            {statusFilterOptions.map((statusOption) => (
              <option key={statusOption} value={statusOption}>
                {statusOption}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => onFromDate(e.target.value)}
            className={`${fieldClass} w-full cursor-text`}
          />
        </div>

        <div>
          <label className={labelClass}>To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => onToDate(e.target.value)}
            className={`${fieldClass} w-full cursor-text`}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentFilters;