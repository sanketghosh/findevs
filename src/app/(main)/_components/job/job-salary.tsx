// local modules
import { fetchCurrentUserCurrency } from "@/app/(main)/_fetchers";
import { convertCurrency } from "@/app/(main)/_utils/convert-currency";
import { salaryFormatter } from "@/app/(main)/_utils/salary-formatter";

type JobSalaryProps = {
  fromCurrency: string;
  salary: number;
};

export default async function JobSalary({
  fromCurrency,
  salary,
}: JobSalaryProps) {
  const { fetchedUserCurrency } = await fetchCurrentUserCurrency();
  const userCurrency = fetchedUserCurrency?.userCurrency || "USD";

  return (
    <p>
      {salaryFormatter(convertCurrency(fromCurrency!, userCurrency, salary))}{" "}
      {userCurrency} PA
    </p>
  );
}
