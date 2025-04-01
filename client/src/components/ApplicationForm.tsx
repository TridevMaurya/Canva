import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  resumeFile: z.instanceof(File, { message: "Please upload your resume" })
});

type FormValues = z.infer<typeof formSchema>;

const ApplicationForm: React.FC = () => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    }
  });
  
  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("resume", data.resumeFile);
      
      return apiRequest("POST", "/api/internship/apply", data);
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you soon.",
        variant: "success",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  });
  
  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };
  
  return (
    <motion.section 
      className="py-12 px-4 md:px-12 relative z-10 mb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.9 }}
    >
      <div className="container mx-auto max-w-3xl">
        <div className="glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple"></div>
          
          <motion.h2 
            className="font-space font-bold text-2xl md:text-3xl mb-6 text-center neon-text-blue"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            Apply for Internship
          </motion.h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-text-light opacity-90 mb-1 font-space text-sm">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full bg-space-blue border border-neon-blue/30 rounded-lg p-3 text-text-light focus:neon-border-blue outline-none transition-all"
                          placeholder="Enter your full name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-text-light opacity-90 mb-1 font-space text-sm">Email Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="w-full bg-space-blue border border-neon-blue/30 rounded-lg p-3 text-text-light focus:neon-border-blue outline-none transition-all"
                          placeholder="your.email@example.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-text-light opacity-90 mb-1 font-space text-sm">Contact Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          className="w-full bg-space-blue border border-neon-blue/30 rounded-lg p-3 text-text-light focus:neon-border-blue outline-none transition-all"
                          placeholder="Enter your contact number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="resumeFile"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel className="block text-text-light opacity-90 mb-1 font-space text-sm">Resume/CV</FormLabel>
                      <div className="relative">
                        <input
                          type="file"
                          id="resume"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onChange(file);
                            }
                          }}
                          accept=".pdf,.doc,.docx"
                          className="sr-only"
                        />
                        <label
                          htmlFor="resume"
                          className="flex items-center justify-center w-full bg-space-blue border border-dashed border-neon-purple/50 rounded-lg p-4 text-text-light cursor-pointer hover:bg-space-blue/80 transition-all"
                        >
                          <span className="text-neon-purple mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                          </span>
                          <span>
                            {value instanceof File ? value.name : 'Click to upload your resume'}
                          </span>
                        </label>
                      </div>
                      <p className="text-xs text-text-light opacity-60 mt-1">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  disabled={mutation.isPending}
                  className="neon-button-green rounded-lg py-3 px-8 font-space font-bold tracking-wider"
                >
                  {mutation.isPending ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </motion.section>
  );
};

export default ApplicationForm;
