
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUploader } from '@/components/FileUploader';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Download } from 'lucide-react';

const JOB_SPEC_TEMPLATES = [
  { id: 'software-engineer', name: 'Software Engineer' },
  { id: 'data-analyst', name: 'Data Analyst' },
  { id: 'project-manager', name: 'Project Manager' },
  { id: 'hr-specialist', name: 'HR Specialist' },
  { id: 'financial-analyst', name: 'Financial Analyst' },
];

const JobSpecs: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('generate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  // Form states
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleGenerate = async () => {
    if (!selectedTemplate || !jobTitle) {
      toast({
        title: "Missing information",
        description: "Please select a template and provide a job title.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate an API call to generate content
    setTimeout(() => {
      const mockGeneratedContent = `# ${jobTitle} - Job Specification\n\n## Overview\nWe are looking for an experienced ${jobTitle} to join our team at UBS. This role requires a combination of technical expertise and business acumen.\n\n## Responsibilities\n- Lead development of complex systems\n- Collaborate with cross-functional teams\n- Participate in code reviews and technical decisions\n\n## Requirements\n- ${experienceLevel || '5+'} years of relevant experience\n- Strong technical background\n- Excellent communication skills\n\n## Additional Information\n${additionalInfo || 'This position offers competitive benefits and growth opportunities.'}\n`;
      
      setGeneratedContent(mockGeneratedContent);
      setIsGenerating(false);
      toast({
        title: "Job Spec Generated",
        description: "Your job specification has been successfully created.",
      });
    }, 2000);
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    
    // Simulate file upload and processing
    setTimeout(() => {
      const mockUploadedContent = `# ${file.name.replace('.pdf', '').replace('.docx', '')}\n\n## Uploaded Job Specification\nThis content represents the parsed job specification from your uploaded file.\n\n## Position Summary\nResponsible for delivering high-quality solutions while maintaining professional standards.\n\n## Key Responsibilities\n- Design and develop solutions\n- Test and implement applications\n- Collaborate with stakeholders\n\n## Required Skills\n- Relevant technical expertise\n- Problem-solving abilities\n- Teamwork and communication skills`;
      
      setGeneratedContent(mockUploadedContent);
      setIsUploading(false);
      setActiveTab('preview');
      toast({
        title: "File Processed",
        description: "Your job specification has been uploaded and processed.",
      });
    }, 2000);
  };

  const handleDownload = () => {
    if (!generatedContent) return;
    
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${jobTitle || 'job-spec'}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Downloaded",
      description: "Your job specification has been downloaded.",
    });
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Job Specifications</h1>
        <p className="text-ubs-gray">Create, upload, and manage job specifications</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 bg-ubs-lightGray">
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          {generatedContent && <TabsTrigger value="preview">Preview</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="generate">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Template</label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {JOB_SPEC_TEMPLATES.map(template => (
                        <SelectItem key={template.id} value={template.id}>{template.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Job Title</label>
                  <Input 
                    value={jobTitle} 
                    onChange={(e) => setJobTitle(e.target.value)} 
                    placeholder="e.g., Senior Software Engineer" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Brief Description</label>
                  <Textarea 
                    value={jobDescription} 
                    onChange={(e) => setJobDescription(e.target.value)} 
                    placeholder="Brief description of the role" 
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Experience Level</label>
                  <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                      <SelectItem value="senior">Senior Level (5-8 years)</SelectItem>
                      <SelectItem value="expert">Expert Level (8+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Additional Information</label>
                  <Textarea 
                    value={additionalInfo} 
                    onChange={(e) => setAdditionalInfo(e.target.value)} 
                    placeholder="Any specific skills, qualifications, or details" 
                    rows={3}
                  />
                </div>
                
                <Button 
                  className="w-full bg-ubs-darkBlue hover:bg-opacity-90" 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Job Specification'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upload">
          <Card>
            <CardContent className="pt-6">
              <FileUploader 
                onFileSelected={handleUpload}
                isUploading={isUploading}
                acceptedFileTypes="application/pdf, .docx, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                maxSizeMB={5}
                label="Upload Job Specification Document"
                description="Drag and drop or click to upload a job specification document (PDF or DOCX, max 5MB)"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        {generatedContent && (
          <TabsContent value="preview">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-end mb-4">
                  <Button 
                    variant="outline"
                    onClick={handleDownload}
                    className="text-ubs-darkBlue border-ubs-darkBlue hover:bg-ubs-darkBlue/10"
                  >
                    <Download size={16} className="mr-2" />
                    Download
                  </Button>
                </div>
                <div className="bg-ubs-lightGray rounded-md p-6 whitespace-pre-wrap font-mono text-sm">
                  {generatedContent}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </Layout>
  );
};

export default JobSpecs;
