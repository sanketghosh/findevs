"use client";

// packages
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// local modules
import {
  JobPostFormSchema,
  JobPostFormSchemaType,
} from "@/app/(main)/_schemas/job-post-form";

// components
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomSelect from "@/components/ui/custom-select";
import {
  COUNTRY_LIST,
  JOB_TYPES,
  SENIORITY_OPTIONS,
  WORKPLACE_OPTIONS,
} from "../../_data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import DescriptionEditor from "../description-editor";

export default function CreateJobForm() {
  const [cityDesc, setCityDesc] = useState<string | undefined | null>();
  const [countryDesc, setCountryDesc] = useState<string | undefined | null>();

  const form = useForm<JobPostFormSchemaType>({
    resolver: zodResolver(JobPostFormSchema),
    defaultValues: {
      title: "",
      description: "",
      companyName: "",
      jobType: "",
      workplace: "",
      seniority: "",
      city: "",
      country: "",
      address: "",
      employerEmail: "",
      employeeWebsite: "",
      salary: "",
    },
  });

  async function onSubmitHandler() {}

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Post a new job</CardTitle>
          <CardDescription>
            Fill all the necessary fields carefully and submit the form to
            create a new job
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitHandler)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Software development intern"
                          type="text"
                          // disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="ABC Company inc."
                          type="text"
                          // disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary (Per Annum)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="700000000"
                          type="text"
                          // disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jobType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Type</FormLabel>
                      <FormControl>
                        <CustomSelect {...field}>
                          <option value="" hidden>
                            Select a job type
                          </option>
                          {JOB_TYPES.map((item) => (
                            <option key={item.jobTypeId} value={item.jobTypeId}>
                              {item.label}
                            </option>
                          ))}
                        </CustomSelect>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="workplace"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workplace Type</FormLabel>
                      <FormControl>
                        <CustomSelect
                          {...field}
                          onChange={(
                            e: React.ChangeEvent<HTMLSelectElement>,
                          ) => {
                            const value = e.target.value;
                            field.onChange(value);

                            if (value === "Remote") {
                              form.setValue("city", "Anywhere");
                              form.setValue("country", "Anywhere");
                              form.clearErrors(["city", "country"]);
                              setCityDesc(
                                "City is set to 'Anywhere' for 'Remote' workplace",
                              );
                              setCountryDesc(
                                "Country is set to 'Anywhere' for 'Remote' workplace",
                              );
                            } else {
                              form.setValue("city", "");
                              form.setValue("country", "");
                              setCityDesc(null);
                              setCountryDesc(null);
                            }
                          }}
                        >
                          <option value="" hidden>
                            Select a workplace type
                          </option>
                          {WORKPLACE_OPTIONS.map((item) => (
                            <option
                              key={item.workplaceOptionId}
                              value={item.workplaceOptionId}
                            >
                              {item.label}
                            </option>
                          ))}
                        </CustomSelect>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="seniority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seniority Options</FormLabel>
                      <FormControl>
                        <CustomSelect {...field}>
                          <option value="" hidden>
                            Select a seniority option
                          </option>
                          {SENIORITY_OPTIONS.map((item) => (
                            <option
                              key={item.seniorityOptionId}
                              value={item.seniorityOptionId}
                            >
                              {item.label}
                            </option>
                          ))}
                        </CustomSelect>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workplace City</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter city name"
                          disabled={form.watch("workplace") === "Remote"} // Disable if "Remote" is selected
                          onBlur={(e) => {
                            if (
                              form.watch("workplace") === "Remote" &&
                              e.target.value !== "Anywhere"
                            ) {
                              form.setError("city", {
                                type: "manual",
                                message:
                                  "City must be 'Anywhere' for Remote jobs.",
                              });
                            } else {
                              form.clearErrors("city");
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription>{cityDesc}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workplace Country</FormLabel>
                      <FormControl>
                        <CustomSelect
                          {...field}
                          disabled={form.watch("workplace") === "Remote"} // Disable if "Remote" is selected
                          onBlur={(e) => {
                            if (
                              form.watch("workplace") === "Remote" &&
                              e.target.value !== "Anywhere"
                            ) {
                              form.setError("country", {
                                type: "manual",
                                message:
                                  "Country must be 'Anywhere' for Remote jobs.",
                              });
                            } else {
                              form.clearErrors("country");
                            }
                          }}
                          className="max-h-60 overflow-auto"
                        >
                          <option value="" hidden>
                            Select a country
                          </option>
                          {COUNTRY_LIST.map((item) => (
                            <option key={item.code} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </CustomSelect>
                      </FormControl>
                      <FormDescription>{countryDesc}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="employerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employer Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="employer@mail.com"
                          type="email"
                          // disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="employeeWebsite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employer Website</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://employer.com"
                          type="url"
                          // disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company/Employer Full Address</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter your full address."
                          rows={4}
                          // disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DescriptionEditor />
              </div>
              <Button>Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
