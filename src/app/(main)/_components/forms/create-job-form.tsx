"use client";

// packages
import { ImageIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// local modules
import { cn } from "@/lib/utils";
import {
  JobPostFormSchema,
  JobPostFormSchemaType,
} from "@/app/(main)/_schemas/job-post-form";
import {
  COUNTRY_LIST,
  CURRENCY_TYPES,
  JOB_TYPES,
  SENIORITY_OPTIONS,
  WORKPLACE_OPTIONS,
} from "@/app/(main)/_data";
import { createJobAction } from "@/app/(main)/_actions/create-job-action";

// components
import DescriptionEditor from "@/app/(main)/_components/forms/description-editor";
import CustomSelect from "@/components/ui/custom-select";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingButton from "@/components/buttons/loading-button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function CreateJobForm() {
  const [cityDesc, setCityDesc] = useState<string | undefined | null>();
  const [countryDesc, setCountryDesc] = useState<string | undefined | null>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
      employerWebsite: "",
      salary: "",
      currency: "USD",
      companyLogo: null,
    },
  });

  const onSubmitJobCreateFormHandler = async (data: JobPostFormSchemaType) => {
    // console.log(data);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      await createJobAction(formData);
      // console.log(formData);
      toast.success("Job post has been created successfully.");
    } catch (error) {
      // alert("Something went wrong, try again.");
      toast.error("Something went wrong, try again.");
    }
  };

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
              onSubmit={form.handleSubmit(onSubmitJobCreateFormHandler)}
              noValidate
              className="space-y-4"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Software development intern"
                          type="text"
                          // disabled={isPending}
                        />
                      </FormControl>
                      <FormDescription>Job title is required</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="ABC Company inc."
                          type="text"
                          // disabled={isPending}
                        />
                      </FormControl>
                      <FormDescription>
                        Company name is required
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency of provided salary</FormLabel>
                      <FormControl>
                        <CustomSelect {...field}>
                          <option value="" hidden>
                            Select the currency
                          </option>
                          {CURRENCY_TYPES.map((item) => (
                            <option key={item.currency} value={item.currency}>
                              {`${item.currency} (${item.countryName})`}
                            </option>
                          ))}
                        </CustomSelect>
                      </FormControl>
                      <FormDescription>
                        If not selected, it defaults to USD.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary (Per Annum)*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="700000000"
                          type="text"
                          // disabled={isPending}
                        />
                      </FormControl>
                      <FormDescription>Default amount is USD.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jobType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Type*</FormLabel>
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
                      <FormDescription>Job type is required.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="workplace"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workplace Type*</FormLabel>
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
                      <FormDescription>
                        Workplace type is required.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="seniority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seniority Options*</FormLabel>
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
                      <FormDescription>
                        Seniority option is required.
                      </FormDescription>
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
                      <FormLabel>Workplace Country*</FormLabel>
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
                          // size={10}
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
                      <FormDescription>
                        {countryDesc
                          ? countryDesc
                          : "Set country. Remote workplace, sets it to 'Anywhere'."}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="employerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Application Email</FormLabel>
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
                  name="employerWebsite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Application Website</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://employer.com"
                          type="url"
                          // disabled={isPending}
                          onChange={(e) => {
                            field.onChange(e);
                            form.trigger("employerEmail");
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
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
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Job Description*</FormLabel>
                      <FormControl>
                        <DescriptionEditor
                          setValue={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormDescription>
                        Job description is a must.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyLogo"
                  render={({ field: { value, ...fieldValues } }) => (
                    <FormItem>
                      <Label>Logo Upload (Only one file & max size 2MB)</Label>
                      <FormLabel
                        className={cn(
                          "flex w-full cursor-pointer flex-col items-center justify-center rounded-md border bg-background px-4 py-14 text-sm text-muted-foreground shadow-sm hover:bg-secondary",
                          imagePreview && "pointer-events-none",
                        )}
                      >
                        <ImageIcon className="size-6 stroke-muted-foreground md:size-8 lg:size-10" />
                        <h1 className="font-semibold capitalize text-muted-foreground md:text-lg">
                          Drop company logo here
                        </h1>
                        <p className="text-sm font-medium text-muted-foreground/60">
                          Only '.png', '.jpg', '.jpeg' format supported and
                          maximum size of 2MB allowed.
                        </p>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          {...fieldValues}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            fieldValues.onChange(file);
                            setImagePreview(URL.createObjectURL(file!));
                          }}
                          className="hidden"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {imagePreview && (
                  <div className="bg_cross_pattern flex h-full w-full items-center justify-center rounded-md border p-3">
                    <div className="relative h-[450px] w-[450px] overflow-hidden rounded-md">
                      <button
                        className="absolute right-4 top-4 z-10 rounded-md border-none bg-destructive p-2 text-white outline-none"
                        onClick={() => {
                          setImagePreview(null);
                        }}
                      >
                        <Trash2Icon />
                      </button>
                      <img
                        src={imagePreview}
                        alt="Image Preview"
                        className="h-[450px] w-[450px] overflow-hidden"
                      />
                    </div>
                  </div>
                )}

                {/* <CompanyLogoUpload /> */}
              </div>

              <div className="flex items-center space-x-4">
                <LoadingButton
                  type="submit"
                  loading={form.formState.isSubmitting}
                >
                  Submit
                </LoadingButton>
                <Link
                  className={cn(
                    buttonVariants({
                      variant: "destructive",
                    }),
                  )}
                  href={"/"}
                >
                  Cancel
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
