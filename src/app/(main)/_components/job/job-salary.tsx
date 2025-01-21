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

  return (
    <p className="ml-1.5">
      {salaryFormatter(
        convertCurrency(
          fromCurrency!,
          fetchedUserCurrency?.userCurrency! || "USD",
          salary,
        ),
      )}{" "}
      {fetchedUserCurrency?.userCurrency || "USD"} PA
    </p>
  );
}
