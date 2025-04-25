
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUploader } from '@/components/FileUploader';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Copy } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const Interviews: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('upload-docs');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [jobSpec, setJobSpec] = useState<File | null>(null);
  const [cv, setCv] = useState<File | null>(null);
  const [additionalContext, setAdditionalContext] = useState('');
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);

  const handleJobSpecUpload = (file: File) => {
    setJobSpec(file);
    toast({
      title: "Job Specification Uploaded",
      description: `${file.name} has been uploaded.`,
    });
  };

  const handleCvUpload = (file: File) => {
    setCv(file);
    toast({
      title: "CV Uploaded",
      description: `${file.name} has been uploaded.`,
    });
  };

  const handleGenerateQuestions = () => {
    if (!jobSpec && !cv) {
      toast({
        title: "Missing Documents",
        description: "Please upload either a job specification or a CV to continue.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate API call to generate questions
    setTimeout(() => {
      const mockQuestions = [
        "Tell me about your experience with Python and data analysis tools, particularly in financial contexts.",
        "How would you approach optimizing a database query that's taking too long to execute?",
        "Describe a situation where you had to meet a tight deadline for a project. How did you manage it?",
        "What metrics would you use to track the success of an investment portfolio application?",
        "How do you stay updated with the latest developments in financial technology?",
        "Tell me about a complex problem you solved and the approach you took.",
        "How do you ensure compliance with financial regulations in your software development?",
        "Describe your experience working in Agile environments.",
        "How would you handle conflicting priorities from different stakeholders?",
        "What's your approach to testing and quality assurance?",
      ];
      
      setGeneratedQuestions(mockQuestions);
      setIsGenerating(false);
      setActiveTab('questions');
      toast({
        title: "Questions Generated",
        description: "Your interview questions have been generated successfully.",
      });
    }, 2000);
  };

  const copyQuestionToClipboard = (question: string) => {
    navigator.clipboard.writeText(question);
    toast({
      title: "Copied to clipboard",
      description: "Question has been copied to clipboard.",
    });
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Interview Questions</h1>
        <p className="text-ubs-gray">Generate relevant interview questions based on job specs and CVs</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 bg-ubs-lightGray">
          <TabsTrigger value="upload-docs">Upload Documents</TabsTrigger>
          {generatedQuestions.length > 0 && <TabsTrigger value="questions">Questions</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="upload-docs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="border border-ubs-gray/20">
              <CardHeader>
                <CardTitle>Upload Job Specification</CardTitle>
              </CardHeader>
              <CardContent>
                <FileUploader 
                  onFileSelected={handleJobSpecUpload}
                  isUploading={isUploading}
                  acceptedFileTypes="application/pdf, .docx, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain"
                  maxSizeMB={5}
                  label={jobSpec ? `Uploaded: ${jobSpec.name}` : "Upload Job Specification"}
                  description="Drag and drop or click to upload a job specification (PDF, DOCX, or TXT)"
                />
              </CardContent>
            </Card>
            
            <Card className="border border-ubs-gray/20">
              <CardHeader>
                <CardTitle>Upload CV/Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <FileUploader 
                  onFileSelected={handleCvUpload}
                  isUploading={isUploading}
                  acceptedFileTypes="application/pdf, .docx, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  maxSizeMB={5}
                  label={cv ? `Uploaded: ${cv.name}` : "Upload CV/Resume"}
                  description="Drag and drop or click to upload a candidate's CV (PDF or DOCX)"
                />
              </CardContent>
            </Card>
          </div>
          
          <Card className="border border-ubs-gray/20 mb-6">
            <CardHeader>
              <CardTitle>Additional Context</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add any specific skills, experience or qualities you're looking for..."
                className="min-h-[120px]"
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
              />
            </CardContent>
          </Card>
          
          <Button 
            className="w-full bg-ubs-darkBlue hover:bg-opacity-90" 
            onClick={handleGenerateQuestions}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Questions...
              </>
            ) : (
              'Generate Interview Questions'
            )}
          </Button>
        </TabsContent>
        
        {generatedQuestions.length > 0 && (
          <TabsContent value="questions">
            <Card className="border border-ubs-gray/20">
              <CardHeader>
                <CardTitle>Generated Interview Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {generatedQuestions.map((question, index) => (
                    <li key={index} className="p-4 bg-ubs-lightGray rounded-md flex justify-between items-start">
                      <span className="mr-4">{index + 1}. {question}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => copyQuestionToClipboard(question)}
                        className="flex-shrink-0 text-ubs-gray hover:text-ubs-darkBlue"
                      >
                        <Copy size={16} />
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </Layout>
  );
};

export default Interviews;
