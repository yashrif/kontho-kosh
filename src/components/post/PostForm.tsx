"use client";

import { useState, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/common/Icons";
import { MDXEditor } from "@/components/post/MDXEditor";
import { type PostFormData, type PostVisibility } from "@/types/post";
import { type MDXEditorMethods } from "@mdxeditor/editor";

type PostFormProps = {
  initialData?: Partial<PostFormData>;
  onSubmit: (data: PostFormData) => Promise<void>;
  onSaveDraft?: (data: PostFormData) => Promise<void>;
  isSubmitting?: boolean;
  isDraft?: boolean;
};

const VISIBILITY_OPTIONS: {
  value: PostVisibility;
  label: string;
  description: string;
  icon: keyof typeof Icons;
}[] = [
  {
    value: "public",
    label: "Public",
    description: "Anyone can view this post",
    icon: "Globe",
  },
  {
    value: "unlisted",
    label: "Unlisted",
    description: "Only people with the link can view",
    icon: "Link",
  },
  {
    value: "private",
    label: "Private",
    description: "Only you can view this post",
    icon: "Lock",
  },
];

/**
 * 📝 Post creation form with modern, futuristic design
 *
 * @param initialData - Initial form data
 * @param onSubmit - Callback when form is submitted
 * @param onSaveDraft - Callback when saving as draft
 * @param isSubmitting - Whether the form is being submitted
 * @param isDraft - Whether this is a draft post
 */
const PostForm = ({
  initialData = {},
  onSubmit,
  onSaveDraft,
  isSubmitting = false,
  isDraft = false,
}: PostFormProps) => {
  const [formData, setFormData] = useState<PostFormData>({
    title: initialData.title || "",
    content: initialData.content || "",
    tags: initialData.tags || [],
    visibility: initialData.visibility || "public",
  });

  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const editorRef = useRef<MDXEditorMethods>(null);

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    if (formData.title.length > 200) {
      newErrors.title = "Title must be less than 200 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting post:", error);
      // Handle error (show toast, etc.)
    }
  }, [formData, onSubmit, validateForm]);

  const handleSaveDraft = useCallback(async () => {
    if (!onSaveDraft) return;

    try {
      await onSaveDraft(formData);
    } catch (error) {
      console.error("Error saving draft:", error);
      // Handle error (show toast, etc.)
    }
  }, [formData, onSaveDraft]);

  const handleAddTag = useCallback(
    (tag: string) => {
      const trimmedTag = tag.trim().toLowerCase();
      if (trimmedTag && !formData.tags.includes(trimmedTag)) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, trimmedTag],
        }));
      }
      setTagInput("");
    },
    [formData.tags]
  );

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  }, []);

  const handleTagInputKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        handleAddTag(tagInput);
      }
    },
    [tagInput, handleAddTag]
  );

  const handleContentChange = useCallback((markdown: string) => {
    setFormData((prev) => ({
      ...prev,
      content: markdown,
    }));

    // Clear content error when user starts typing
    if (errors.content && markdown.trim()) {
      setErrors((prev) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { content, ...rest } = prev;
        return rest;
      });
    }
  }, [errors.content]);

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-l-4 border-l-primary/30 hover:border-l-primary transition-colors duration-300 glow-on-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Icons.Edit className="h-5 w-5 text-primary" />
            </div>
            {isDraft ? "Edit Draft" : "Create New Post"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Post Title
            </Label>
            <Input
              id="title"
              placeholder="Enter an engaging title for your post..."
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className={
                errors.title
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title}</p>
            )}
            <p className="text-xs text-muted-foreground">
              {formData.title.length}/200 characters
            </p>
          </div>

          {/* Tags Input */}
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-medium">
              Tags
            </Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-1 cursor-pointer hover:bg-secondary/80"
                  onClick={() => handleRemoveTag(tag)}
                >
                  <Icons.Tag className="h-3 w-3" />
                  {tag}
                  <Icons.Close className="h-3 w-3 ml-1 hover:text-destructive" />
                </Badge>
              ))}
            </div>
            <Input
              id="tags"
              placeholder="Add tags (press Enter or comma to add)..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
              onBlur={() => tagInput && handleAddTag(tagInput)}
            />
            <p className="text-xs text-muted-foreground">
              Add relevant tags to help others discover your content
            </p>
          </div>

          {/* Visibility Settings */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Visibility</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {VISIBILITY_OPTIONS.map((option) => {
                const IconComponent = Icons[option.icon];
                const isSelected = formData.visibility === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        visibility: option.value,
                      }))
                    }
                    className={`
											p-3 rounded-lg border transition-all duration-200 text-left cursor-pointer
											${
                        isSelected
                          ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                          : "border-border hover:border-primary/30 hover:bg-muted/50"
                      }
										`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`
												flex h-8 w-8 items-center justify-center rounded-full
												${isSelected ? "bg-primary/20" : "bg-muted"}
											`}
                      >
                        <IconComponent
                          className={`h-4 w-4 ${
                            isSelected
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {option.label}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {option.description}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Editor Card */}
      <Card className="border-l-4 border-l-secondary/30 hover:border-l-secondary transition-colors duration-300 glow-on-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
              <Icons.FileText className="h-5 w-5 text-secondary" />
            </div>
            Content Editor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-medium">
              Post Content
            </Label>
            <div className={errors.content ? "ring-2 ring-destructive/20 rounded-lg" : ""}>
              <MDXEditor
                ref={editorRef}
                markdown={formData.content}
                onChange={handleContentChange}
                placeholder="Start writing your post content... You can use markdown formatting, add images, tables, code blocks, and more!"
              />
            </div>
            {errors.content && (
              <p className="text-xs text-destructive">{errors.content}</p>
            )}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Supports markdown, images, tables, code blocks, and more</span>
              <span>{formData.content.length} characters</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        {onSaveDraft && (
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isSubmitting}
            className="order-2 sm:order-1"
          >
            <Icons.Save className="mr-2 h-4 w-4" />
            Save as Draft
          </Button>
        )}

        <Button
          onClick={handleSubmit}
          disabled={
            isSubmitting || !formData.title.trim() || !formData.content.trim()
          }
          className="order-1 sm:order-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              {isDraft ? "Publishing..." : "Creating..."}
            </>
          ) : (
            <>
              <Icons.Send className="mr-2 h-4 w-4" />
              {isDraft ? "Publish Post" : "Create Post"}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export { PostForm };
